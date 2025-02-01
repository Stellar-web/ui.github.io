from flask import Flask, send_from_directory, jsonify, request

app = Flask(__name__)

# ข้อมูลผู้ป่วยชั่วคราว
patients = [
    {"name": "สมชาย ใจดี", "room": "101", "symptoms": "ไข้สูง"},
    {"name": "สายฝน สุขสบาย", "room": "102", "symptoms": "ปวดหัว"},
]

# เส้นทางสำหรับหน้า Admin Panel
@app.route('/admin')
def admin_page():
    return send_from_directory('admin', 'admin.html')

# เส้นทางสำหรับ Static Files เช่น admin.js, admin.css
@app.route('/admin/<path:filename>')
def admin_static_files(filename):
    return send_from_directory('admin', filename)

# เส้นทางสำหรับเพิ่มผู้ป่วย (POST)
@app.route('/add-patient', methods=['POST'])
def add_patient():
    data = request.json
    patients.append(data)  # เพิ่มข้อมูลลงในลิสต์
    return jsonify({"message": "เพิ่มข้อมูลสำเร็จ", "patients": patients})

# เส้นทางสำหรับดึงรายชื่อผู้ป่วยทั้งหมด (GET)
@app.route('/patients', methods=['GET'])
def get_patients():
    return jsonify(patients)

# เส้นทางสำหรับลบข้อมูลผู้ป่วย (DELETE)
@app.route('/delete-patient/<int:index>', methods=['DELETE'])
def delete_patient(index):
    if 0 <= index < len(patients):
        patients.pop(index)
        return jsonify({"message": "ลบข้อมูลสำเร็จ", "patients": patients})
    return jsonify({"error": "ไม่พบข้อมูลผู้ป่วย"}), 404

# เส้นทางสำหรับหน้าแรก (เช่น index.html)
@app.route('/')
def index_page():
    # โหลด index.html จากโฟลเดอร์หลัก
    return send_from_directory('.', 'index.html')

@app.route('/admin/welcome.html')
def welcome_page():
    return send_from_directory('admin', 'index.html')

# เส้นทางสำหรับ Static Files หลัก (scripts.js, styles.css)
@app.route('/<path:filename>')
def serve_static_files(filename):
    # โหลดไฟล์จากโฟลเดอร์หลัก
    return send_from_directory('.', filename)

# ตัวอย่างข้อมูลสถานะพยาบาล
nurse_shifts = {
    "status": "off-duty",  # สถานะ: "on-duty" หรือ "off-duty"
    "current_nurse": None, # ชื่อพยาบาลที่กำลังเข้าเวร
    "next_shift": None     # เวลาที่ต้องเข้าเวรใหม่
}

# API: เช็คสถานะเวร
@app.route('/shift-status', methods=['GET'])
def get_shift_status():
    return jsonify(nurse_shifts)

# API: อัปเดตสถานะเวร
@app.route('/update-shift', methods=['POST'])
def update_shift():
    data = request.json
    nurse_shifts['status'] = data.get('status', nurse_shifts['status'])
    nurse_shifts['current_nurse'] = data.get('current_nurse', nurse_shifts['current_nurse'])
    nurse_shifts['next_shift'] = data.get('next_shift', nurse_shifts['next_shift'])
    return jsonify({"message": "สถานะเวรอัปเดตสำเร็จ", "nurse_shifts": nurse_shifts})


# เริ่มเซิร์ฟเวอร์
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

