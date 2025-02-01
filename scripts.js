console.log("scripts.js is loaded");

// ฟังก์ชันเปิด Modal
function showSchedule() {
  const modal = document.getElementById('schedule-modal');
  modal.classList.add('active');
}

// ฟังก์ชันปิด Modal
function closeSchedule() {
  const modal = document.getElementById('schedule-modal');
  modal.classList.remove('active');
}

// ฟังก์ชันสลับสถานะปุ่ม
function toggleFollow() {
  const button = document.getElementById('toggle-follow-button');

  if (button.classList.contains('stop')) {
    button.classList.remove('stop');
    button.classList.add('follow');
    button.textContent = 'เดินตาม';
    button.style.backgroundColor = 'green';
  } else {
    button.classList.remove('follow');
    button.classList.add('stop');
    button.textContent = 'หยุดการเดินตาม';
    button.style.backgroundColor = 'red';
  }
}

// เพิ่ม event listener ให้ปุ่ม
const toggleFollowButton = document.getElementById('toggle-follow-button');
if (toggleFollowButton) {
  toggleFollowButton.addEventListener('click', toggleFollow);
}

const patientHistories = {
  'นายจรัสเดช ชัชวาลย์': {
    photo: 'charasdech.jpg',
    birthday: '10 ธันวาคม 2520',
    age: 44,
    medicalHistory: 'เป็นเบาหวาน',
    allergicDrugs: 'ไม่มี',
    allergicFoods: 'ไม่มี',
  },
  'นายทรงโชค กล้าแข็ง': {
    photo: 'songsok.jpg',
    birthday: '15 มกราคม 2525',
    age: 39,
    medicalHistory: 'โรคความดันโลหิตสูง',
    allergicDrugs: 'ไม่มี',
    allergicFoods: 'อาหารทะเล',
  },
  'นางสาววันดี โค้ไพบูลย์': {
    photo: 'wandee.jpg',
    birthday: '7 กรกฎาคม 2533',
    age: 31,
    medicalHistory: 'โรคไมเกรน',
    allergicDrugs: 'ยาคลายเครียดบางชนิด',
    allergicFoods: 'นมวัว',
  },
  'นายวิศรุฒน์ เอมสมบูรณ์': {
    photo: 'wisarut.jpg',
    birthday: '20 สิงหาคม 2523',
    age: 41,
    medicalHistory: 'โรคข้ออักเสบ',
    allergicDrugs: 'ไม่มี',
    allergicFoods: 'ถั่วลิสง',
  },
  'นางสาวมุทิตา กฤชอาคม': {
    photo: 'mutita.jpg',
    birthday: '5 มิถุนายน 2530',
    age: 34,
    medicalHistory: 'โรคข้อเสื่อม, โรคไมเกรน',
    allergicDrugs: 'ยาพาราเซตามอล',
    allergicFoods: 'อาหารทะเล',
  }
};

// ฟังก์ชันเปิด Modal ดูประวัติ
function viewHistory(patientName) {
  const modal = document.getElementById('history-modal');
  const historyDetails = document.getElementById('history-details');

  const patient = patientHistories[patientName];
  if (patient) {
    historyDetails.innerHTML = `
          <img src="${patient.photo}" alt="รูปผู้ป่วย" style="width:100px; height:100px; border-radius:50%; margin-bottom:10px;">
          <p><strong>ชื่อ:</strong> ${patientName}</p>
          <p><strong>วันเกิด:</strong> ${patient.birthday}</p>
          <p><strong>อายุ:</strong> ${patient.age} ปี</p>
          <p><strong>ประวัติการรักษา:</strong> ${patient.medicalHistory}</p>
          <p><strong>ยาที่แพ้:</strong> ${patient.allergicDrugs}</p>
          <p><strong>อาหารที่แพ้:</strong> ${patient.allergicFoods}</p>
      `;
  } else {
    historyDetails.innerHTML = `<p><strong>ชื่อผู้ป่วย:</strong> ${patientName}</p><p>ไม่พบข้อมูลประวัติ</p>`;
  }

  modal.classList.add('active');
}

function closeHistory() {
  const modal = document.getElementById('history-modal');
  modal.classList.remove('active');
}

function showSummary() {
  const summaryTable = document.getElementById('summaryTable');
  const summaryModal = document.getElementById('summary-modal');

  if (!summaryTable || !summaryModal) {
    console.error('ไม่พบองค์ประกอบที่เกี่ยวข้องใน DOM');
    return;
  }

  // ตัวอย่างข้อมูลสรุปเวรก่อนหน้า
  const previousShiftData = [
    { id: 1, patientName: "นายจรัสเดช ชัชวาลย์", medication: "ยาลดความดัน", status: "ให้ยาเรียบร้อยแล้ว", time: "09:00" },
    { id: 2, patientName: "นายทรงโชค กล้าแข็ง", medication: "ยาลดน้ำตาล", status: "ให้ยาเรียบร้อยแล้ว", time: "09:30" },
    { id: 3, patientName: "นางสาววันดี โค้ไพบูลย์", medication: "ยาคลายเครียด", status: "ให้ยาเรียบร้อยแล้ว", time: "10:00" }
  ];

  summaryTable.innerHTML = ''; // ล้างข้อมูลเก่า
  previousShiftData.forEach(record => {
    const row = `
      <tr>
        <td>${record.id}</td>
        <td>${record.patientName}</td>
        <td>${record.medication}</td>
        <td>${record.status}</td>
        <td>${record.time}</td>
      </tr>
    `;
    summaryTable.innerHTML += row;
  });

  summaryModal.classList.add('active');
}


// ฟังก์ชันสำหรับแสดงปุ่มจบการเข้าเวร
function showEndShiftButton() {
  const endShiftButton = document.getElementById('endShiftButton');
  endShiftButton.style.display = 'block';
  endShiftButton.style.opacity = '1';
}

document.addEventListener('DOMContentLoaded', () => {
    // เริ่มจากซ่อนป็อปอัพปัญหา
    const problemPopup = document.getElementById('problem-popup');
    const notificationPopup = document.getElementById('notification-popup');
    
    // รอ 10 วินาทีแล้วแสดงป็อปอัพการแจ้งเตือน
    setTimeout(() => {
      notificationPopup.classList.remove('hidden');
    }, 10000);

    // เมื่อกด "ไม่สามารถให้ยาได้"
    document.getElementById('confirm-no').addEventListener('click', () => {
      notificationPopup.classList.add('hidden'); // ปิดป็อปอัพแรก
      problemPopup.classList.remove('hidden'); // แสดงป็อปอัพปัญหา
    });

    // เมื่อกด "ให้ยาเรียบร้อยแล้ว"
    document.getElementById('confirm-yes').addEventListener('click', () => {
      notificationPopup.classList.add('hidden'); // ปิดป็อปอัพแรก
      // คุณอาจทำเพิ่มเติม เช่น ส่งข้อมูลไปที่เซิร์ฟเวอร์
    });

    // จัดการปุ่มเริ่มอัดเสียง
    document.getElementById('start-recording').addEventListener('click', () => {
      console.log("เริ่มอัดเสียง");
      document.getElementById('start-recording').disabled = true;
      document.getElementById('stop-recording').disabled = false;
      document.getElementById('status-message').textContent = "กำลังอัดเสียง...";
    });

    // จัดการปุ่มหยุดอัดเสียง
    document.getElementById('stop-recording').addEventListener('click', () => {
      console.log("หยุดอัดเสียง");
      document.getElementById('start-recording').disabled = false;
      document.getElementById('stop-recording').disabled = true;
      document.getElementById('status-message').textContent = "แจ้งข้อมูลหาแพทย์เรียบร้อย";
    });
  });

// จัดการปุ่มอัดเสียง
document.getElementById("start-recording").addEventListener("click", () => {
  console.log("เริ่มอัดเสียง");
  document.getElementById("start-recording").disabled = true;
  document.getElementById("stop-recording").disabled = false;
  document.getElementById("status-message").textContent = "กำลังอัดเสียง...";
});

document.getElementById("stop-recording").addEventListener("click", () => {
  console.log("หยุดอัดเสียง");
  document.getElementById("start-recording").disabled = false;
  document.getElementById("stop-recording").disabled = true;
  document.getElementById("status-message").textContent = "การอัดเสียงเสร็จสิ้น!";
});

// จัดการปิดป็อปอัพปัญหา
document.getElementById("problem-close").onclick = () => {
  const problemPopup = document.getElementById("problem-popup");
  problemPopup.style.display = "none";
};

function show10MinNotification() {
  const notification10Min = document.getElementById('notification-10-min');
  notification10Min.classList.add('active');
}

function closeNotification() {
  const notification = document.getElementById('notification-popup');
  const overlay = document.getElementById('notification-overlay');
  
  if (notification) {
    notification.classList.remove('active');
  }
  if (overlay) {
    overlay.classList.remove('active');
  }
}


function showNowNotification() {
  const notificationNow = document.getElementById('notification-now');
  notificationNow.classList.add('active');
}

document.getElementById('done-button').addEventListener('click', () => {
  document.getElementById('notification-now').classList.remove('active');
  // Handle "เรียบร้อย" action
});

document.getElementById('not-given-button').addEventListener('click', () => {
  document.getElementById('notification-now').classList.remove('active');
  // Handle "ให้ยาไม่ได้" action
});

// ฟังก์ชันจัดการเมื่อจบการเข้าเวร
document.getElementById('endShiftButton').addEventListener('click', () => {
  document.body.style.opacity = '0';

  setTimeout(() => {
    document.body.innerHTML = `<div class="thank-you-message">ขอบคุณที่ตั้งใจทำงาน</div>`;
    document.body.style.opacity = '1';

    setTimeout(() => {
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'welcome.html';
      }, 1000);
    }, 2000);
  }, 1000);
});



// ฟังก์ชันปิด Modal สรุปเวรก่อนหน้า
function closeSummary() {
  const summaryModal = document.getElementById('summary-modal');
  summaryModal.classList.remove('active');
}

// ฟังก์ชันรันเมื่อโหลด DOM
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(showEndShiftButton, 2000); // แสดงปุ่มหลังจาก splash screen fade out
});
