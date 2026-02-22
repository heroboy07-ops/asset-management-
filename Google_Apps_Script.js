// ========================================
// 장비관리 Apps Script - 최종 완성본
// ========================================

const SPREADSHEET_ID = '1qWL923DKQ8MI4Iw2A2Xn7izm7wftpBCEfVvgitlhln0';

const EQUIPMENT_SHEETS = {
  '청력기': '청력기',
  '청력부스': '청력부스',
  '중이기기': '중이기기',
  '소음계': '소음계',
  '원심분리기': '원심분리기',
  'HRV': 'HRV',
  'EKG': 'EKG',
  '폐활량': '폐활량',
  '실린지': '실린지',
  '프린터기': '프린터기',
  '업무용노트북': '업무용노트북',
  '와이브로': '와이브로',
  '포터블모니터': '포터블모니터'
};

// ========================================
// POST 요청 처리 (앱에서 호출)
// ========================================
function doPost(e) {
  try {
    Logger.log('=== 요청 받음 ===');
    Logger.log('데이터: ' + e.postData.contents);
    
    const data = JSON.parse(e.postData.contents);
    updateEquipmentSheet(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '✅ 업데이트 완료'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('❌ 에러: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// 장비 시트 업데이트
// ========================================
function updateEquipmentSheet(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetName = EQUIPMENT_SHEETS[data.equipment];
  
  if (!sheetName) {
    throw new Error('❌ 알 수 없는 장비: ' + data.equipment);
  }
  
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error('❌ 시트를 찾을 수 없음: ' + sheetName);
  }
  
  Logger.log('✅ 시트 찾음: ' + sheetName);
  Logger.log('자산번호: ' + data.assetNo);
  
  // ========================================
  // 1. 자산번호로 행 찾기 (E열)
  // ========================================
  const lastRow = sheet.getLastRow();
  const assetColumn = sheet.getRange(2, 5, lastRow - 1, 1).getValues();
  let targetRow = -1;
  
  for (let i = 0; i < assetColumn.length; i++) {
    const cellValue = String(assetColumn[i][0]).trim();
    const searchValue = String(data.assetNo).trim();
    
    if (cellValue === searchValue) {
      targetRow = i + 2;
      Logger.log('✅ 행 찾음: ' + targetRow);
      break;
    }
  }
  
  if (targetRow === -1) {
    throw new Error('❌ 자산번호를 찾을 수 없음: ' + data.assetNo);
  }
  
  // ========================================
  // 2. 현재위치 업데이트 (F열)
  // ========================================
  let newLocation = '';
  
  if (data.status === '수령' || data.status === '보유' || data.status === '수령예정') {
    newLocation = data.team;
  } else if (data.status === '반납') {
    newLocation = '사무실';
  }
  
  sheet.getRange(targetRow, 6).setValue(newLocation);
  Logger.log('✅ 위치 업데이트: ' + newLocation);
  
  // ========================================
  // 3. 날짜 열 찾기 (MM/DD 형식)
  // ========================================
  const dateObj = new Date(data.date);
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const searchDate = month + '/' + day;
  
  Logger.log('찾는 날짜: ' + searchDate);
  
  const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let dateColumn = -1;
  
  for (let i = 6; i < headerRow.length; i++) {
    const headerValue = String(headerRow[i]).trim();
    if (headerValue === searchDate) {
      dateColumn = i + 1;
      Logger.log('✅ 날짜 열 찾음: ' + dateColumn);
      break;
    }
  }
  
  if (dateColumn === -1) {
    Logger.log('❌ 날짜 열을 찾을 수 없음');
    Logger.log('헤더 샘플: ' + headerRow.slice(6, 15).join(', '));
    throw new Error('❌ 날짜 열을 찾을 수 없음: ' + searchDate);
  }
  
  // ========================================
  // 4. 기록 작성
  // ========================================
  let record = '';
  
  if (data.status === '수령') {
    record = data.team + ' 수령 (' + data.manager + ') - ' + data.memo;
  } else if (data.status === '보유') {
    record = data.team + ' 보유 (' + data.manager + ') - ' + data.memo;
  } else if (data.status === '반납') {
    record = data.team + ' 반납 (반납사유: ' + data.returnReason + ' / ' + data.manager + ') - ' + data.memo;
  } else if (data.status === '수령예정') {
    record = data.team + ' 수령예정 (' + data.manager + ') - ' + data.memo;
  }
  
  Logger.log('기록: ' + record);
  
  // ========================================
  // 5. 기존 기록에 추가 (히스토리 누적)
  // ========================================
  const currentCell = sheet.getRange(targetRow, dateColumn);
  const currentValue = currentCell.getValue();
  
  if (currentValue && String(currentValue).trim() !== '') {
    currentCell.setValue(currentValue + '\n' + record);
    Logger.log('✅ 기존 기록에 추가');
  } else {
    currentCell.setValue(record);
    Logger.log('✅ 새 기록 추가');
  }
  
  Logger.log('=== 업데이트 완료 ===');
}

// ========================================
// GET 요청 처리 (테스트용)
// ========================================
function doGet(e) {
  return ContentService.createTextOutput('✅ Apps Script 정상 작동 중!');
}

// ========================================
// 테스트 함수
// ========================================
function testUpdate() {
  Logger.log('=== 테스트 시작 ===');
  
  const testData = {
    team: '1팀',
    status: '수령',
    equipment: '청력기',
    assetNo: '50604-00152',
    manager: '안성진',
    memo: '테스트입니다',
    returnReason: '',
    date: '2025-02-22'
  };
  
  try {
    updateEquipmentSheet(testData);
    Logger.log('=== ✅ 테스트 성공! ===');
    Logger.log('Sheets를 확인하세요!');
  } catch (error) {
    Logger.log('=== ❌ 테스트 실패 ===');
    Logger.log('에러: ' + error.toString());
  }
}
