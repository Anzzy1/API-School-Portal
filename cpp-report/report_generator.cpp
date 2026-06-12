#include <iostream>
#include <fstream>
#include <string>
#include <cstring>
#include <sstream>
#include <vector>
#include <iomanip>
#include <algorithm>

using namespace std;

string extractField(const string& data, const string& field) {
    size_t pos = data.find("\"" + field + "\":\"");
    if (pos != string::npos) {
        pos += field.length() + 4;
        size_t end = data.find("\"", pos);
        return data.substr(pos, end - pos);
    }
    pos = data.find("\"" + field + "\":");
    if (pos != string::npos) {
        pos = data.find(":", pos) + 1;
        size_t end = data.find(",", pos);
        if (end == string::npos) end = data.find("}", pos);
        string val = data.substr(pos, end - pos);
        val.erase(remove(val.begin(), val.end(), '"'), val.end());
        return val;
    }
    return "N/A";
}

void extractSchedules(const string& data, vector<vector<string>>& schedules) {
    size_t schedPos = data.find("\"schedules\":");
    if (schedPos == string::npos) return;

    size_t arrStart = data.find("[", schedPos);
    if (arrStart == string::npos) return;
    size_t arrEnd = data.find("]", arrStart);
    if (arrEnd == string::npos) return;

    string arr = data.substr(arrStart + 1, arrEnd - arrStart - 1);
    size_t cur = 0;

    while (true) {
        size_t objStart = arr.find("{", cur);
        if (objStart == string::npos) break;
        size_t objEnd = arr.find("}", objStart);
        if (objEnd == string::npos) break;

        string obj = arr.substr(objStart, objEnd - objStart + 1);
        vector<string> row;
        row.push_back(extractField(obj, "subject"));
        row.push_back(extractField(obj, "day"));
        row.push_back(extractField(obj, "time_start"));
        row.push_back(extractField(obj, "time_end"));
        row.push_back(extractField(obj, "room"));
        schedules.push_back(row);
        cur = objEnd + 1;
    }
}

void drawLine(ofstream& out, char ch = '=', int len = 60) {
    for (int i = 0; i < len; i++) out << ch;
    out << endl;
}

void generateReport(const string& studentData, const string& outputPath) {
    ofstream out(outputPath);
    if (!out.is_open()) {
        cerr << "ERROR: Cannot open output file: " << outputPath << endl;
        return;
    }

    string student_id = extractField(studentData, "student_id");
    string first_name = extractField(studentData, "first_name");
    string middle_name = extractField(studentData, "middle_name");
    string last_name = extractField(studentData, "last_name");
    string suffix = extractField(studentData, "suffix");
    string course_code = extractField(studentData, "course_code");
    string email = extractField(studentData, "email");
    string phone = extractField(studentData, "phone");
    string nationality = extractField(studentData, "nationality");
    string religion = extractField(studentData, "religion");
    string gender = extractField(studentData, "gender");
    string status = extractField(studentData, "status");

    string full_name = first_name;
    if (!middle_name.empty() && middle_name != "N/A") full_name += " " + middle_name;
    full_name += " " + last_name;
    if (!suffix.empty() && suffix != "N/A") full_name += ", " + suffix;

    vector<vector<string>> schedules;
    extractSchedules(studentData, schedules);

    out << endl;
    drawLine(out, '=', 58);
    out << "   AGUINALDO POLYTECHNIC INSTITUTE" << endl;
    out << "        ENROLLMENT CONFIRMATION" << endl;
    drawLine(out, '=', 58);
    out << endl;

    drawLine(out, '-', 58);
    out << "  STUDENT INFORMATION" << endl;
    drawLine(out, '-', 58);
    out << "  Student ID  : " << student_id << endl;
    out << "  Full Name   : " << full_name << endl;
    out << "  Email       : " << email << endl;
    out << "  Phone       : " << (phone.empty() || phone == "N/A" ? "N/A" : phone) << endl;
    out << "  Gender      : " << (gender.empty() || gender == "N/A" ? "N/A" : gender) << endl;
    out << "  Nationality : " << (nationality.empty() || nationality == "N/A" ? "N/A" : nationality) << endl;
    out << "  Religion    : " << (religion.empty() || religion == "N/A" ? "N/A" : religion) << endl;
    out << "  Program     : " << course_code << endl;
    out << "  Status      : " << (status.empty() || status == "N/A" ? "Pending" : status) << endl;
    out << endl;

    drawLine(out, '-', 58);
    out << "  CLASS SCHEDULE" << endl;
    drawLine(out, '-', 58);

    if (schedules.empty()) {
        out << "  No schedule assigned yet." << endl;
    } else {
        drawLine(out, '-', 58);
        out << "  " << left << setw(12) << "Day" << setw(20) << "Subject" << setw(14) << "Time" << "Room" << endl;
        drawLine(out, '-', 58);

        for (size_t i = 0; i < schedules.size(); i++) {
            string time = schedules[i][2] + "-" + schedules[i][3];
            out << "  " << left << setw(12) << schedules[i][1]
                    << setw(20) << schedules[i][0]
                    << setw(14) << time
                    << schedules[i][4] << endl;
        }
        drawLine(out, '-', 58);
    }
    out << endl;

    drawLine(out, '=', 58);
    out << "  Generated by Aguinaldo Polytechnic Institute" << endl;
    time_t now = time(0);
    string dt = ctime(&now);
    dt.erase(remove(dt.begin(), dt.end(), '\n'), dt.end());
    out << "  Date: " << dt << endl;
    out << "  Document ID: ENR-" << student_id << "-" << now << endl;
    drawLine(out, '=', 58);
    out << endl;

    out.close();
    cout << "SUCCESS: Report generated at " << outputPath << endl;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        cerr << "ERROR: No input data provided." << endl;
        cerr << "Usage: report_generator.exe '<json_data>'" << endl;
        return 1;
    }

    string inputData = argv[1];

    size_t outPos = inputData.find("\"outputPath\":\"");
    if (outPos == string::npos) {
        cerr << "ERROR: No output path specified in input data." << endl;
        return 1;
    }
    outPos += 13;
    size_t outEnd = inputData.find("\"", outPos);
    string outputPath = inputData.substr(outPos, outEnd - outPos);

    generateReport(inputData, outputPath);
    return 0;
}
