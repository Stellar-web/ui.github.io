const API_URL = "http://localhost:5000"; // URL ของเซิร์ฟเวอร์ Flask

// ฟังก์ชันโหลดข้อมูลผู้ป่วย
async function loadPatients() {
    console.log("เริ่มโหลดข้อมูลผู้ป่วย...");
    try {
        const response = await fetch(`${API_URL}/patients`);
        const patients = await response.json();
        console.log("ข้อมูลผู้ป่วยที่ได้จาก API:", patients);

        const patientTable = document.getElementById('patientTable');
        patientTable.innerHTML = ''; // ล้างข้อมูลเก่า

        if (patients.length === 0) {
            patientTable.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center;">ไม่มีข้อมูลผู้ป่วย</td>
                </tr>`;
            return;
        }

        patients.forEach((patient, index) => {
            const row = `
                <tr>
                    <td>${patient.name}</td>
                    <td>${patient.room}</td>
                    <td>${patient.symptoms}</td>
                    <td>
                        <button onclick="deletePatient(${index})">ลบ</button>
                    </td>
                </tr>`;
            patientTable.innerHTML += row;
        });
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ป่วย:", error);
    }
}

loadPatients(); // เรียกฟังก์ชันเมื่อหน้าเว็บโหลด
