let selectedHour = '00';
let selectedMinute = '00';

// เลือกเวลา
document.querySelectorAll('.time-item-modern').forEach(item => {
  item.addEventListener('click', function () {
    const parentColumn = this.parentElement.id;

    // ตรวจสอบว่าเลือกชั่วโมงหรือวินาที
    if (parentColumn === 'hourColumn') {
      selectedHour = this.getAttribute('data-value');
    } else if (parentColumn === 'minuteColumn') {
      selectedMinute = this.getAttribute('data-value');
    }

    // เพิ่มคลาส selected และลบคลาสจากตัวอื่น
    const siblings = this.parentNode.querySelectorAll('.time-item-modern');
    siblings.forEach(sibling => sibling.classList.remove('selected'));
    this.classList.add('selected');

    // เลื่อนเวลาไปยังตำแหน่งที่เลือก
    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// ยืนยันเวลา
document.getElementById('confirmTime').addEventListener('click', () => {
  const selectedTimeDisplay = document.getElementById('selectedTime');
  selectedTimeDisplay.textContent = `คุณเลือกเวลา: ${selectedHour}:${selectedMinute}`;
  document.getElementById('timePopup').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
});

openPopupButton.addEventListener('click', () => {
  // ดึงค่าชื่อพยาบาลจาก dropdown
  const nurseName = document.getElementById('nurseName').value;

  // ถ้าไม่มีการเลือกชื่อ ให้แสดง Alert และหยุดการทำงาน
  if (!nurseName) {
    alert('กรุณาเลือกชื่อพยาบาลก่อน!');
    return;
  }

  // แสดงป็อปอัพและ overlay
  timePopup.classList.add('active');
  overlay.classList.add('active');

  // เน้นโฟกัสไปที่ป็อปอัพ
  timePopup.focus();
});
