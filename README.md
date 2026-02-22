# 🏥 장비관리 PWA 앱 설치 가이드

## 📦 파일 목록
- `index.html` - 메인 앱
- `manifest.json` - PWA 설정
- `service-worker.js` - 오프라인 작동
- `Google_Apps_Script.js` - Sheets 연동

---

## 🚀 GitHub Pages 배포 방법

### 1단계: GitHub 저장소 생성
1. https://github.com 접속
2. 로그인
3. 오른쪽 상단 `+` → `New repository`
4. Repository name: `equipment-app`
5. Public 선택
6. `Create repository` 클릭

### 2단계: 파일 업로드
1. 생성된 저장소에서 `uploading an existing file` 클릭
2. 다음 파일 드래그:
   - index.html
   - manifest.json
   - service-worker.js
3. `Commit changes` 클릭

### 3단계: GitHub Pages 활성화
1. 저장소 → `Settings`
2. 왼쪽 메뉴 → `Pages`
3. Source: `Deploy from a branch`
4. Branch: `main` 선택
5. 폴더: `/ (root)` 선택
6. `Save` 클릭

### 4단계: 배포 완료 (약 2분 소요)
- URL: `https://당신계정명.github.io/equipment-app`
- 이 링크로 접속하면 앱 실행!

---

## 📱 앱 설치 방법

### iPhone (Safari)
1. 위 URL 접속
2. 공유 버튼 클릭 (아래 화살표)
3. "홈 화면에 추가" 선택
4. "추가" 클릭
5. 홈 화면에 앱 아이콘 생성됨!

### Android (Chrome)
1. 위 URL 접속
2. 오른쪽 상단 메뉴 (⋮)
3. "홈 화면에 추가" 선택
4. "추가" 클릭
5. 홈 화면에 앱 아이콘 생성됨!

---

## 🔧 Apps Script 설정

### 1단계: Sheets에 스크립트 추가
1. Google Sheets 열기
2. 확장 프로그램 → Apps Script
3. 좌측 `+` → 스크립트 추가
4. 이름: `장비관리`
5. `Google_Apps_Script.js` 내용 붙여넣기
6. 저장 (Ctrl+S)

### 2단계: 테스트
1. 함수 선택: `testUpdate`
2. 실행 버튼 클릭
3. 권한 승인
4. 로그 확인
5. Sheets에서 데이터 확인

### 3단계: 배포
1. 배포 → 새 배포
2. 유형: 웹 앱
3. 실행 대상: 나
4. 액세스 권한: 모든 사용자
5. 배포 클릭
6. **URL 복사!** (예: https://script.google.com/.../exec)

### 4단계: 앱에 URL 입력
1. GitHub에서 `index.html` 클릭
2. 연필 아이콘 (Edit) 클릭
3. Ctrl+F → `여기에_Apps_Script_URL_입력` 검색
4. 복사한 URL로 교체
5. `Commit changes` 클릭
6. 완성!

---

## ✅ 완료 체크리스트

- [ ] GitHub 저장소 생성
- [ ] 파일 3개 업로드
- [ ] GitHub Pages 활성화
- [ ] Apps Script 배포
- [ ] index.html에 URL 입력
- [ ] 앱 접속 테스트
- [ ] 폰에 앱 설치
- [ ] 218062로 관리자 가입
- [ ] Sheets 연동 테스트

---

## 🎯 최종 URL

```
https://당신의GitHub계정.github.io/equipment-app
```

이 링크를 팀원들에게 공유하세요!

---

## 🆘 문제 해결

### 앱이 안 열려요
- GitHub Pages 활성화 확인
- 2-3분 대기 후 재시도
- 주소가 정확한지 확인

### Sheets 연동이 안 돼요
- Apps Script URL이 제대로 입력됐는지 확인
- Apps Script 배포 권한 확인
- 브라우저 콘솔 확인 (F12)

### 앱 설치가 안 돼요
- Safari/Chrome 사용 확인
- 개인정보보호 모드 아닌지 확인
- 페이지 새로고침 후 재시도

---

## 📞 지원

문제가 있으면 Apps Script 로그를 확인하세요:
1. Apps Script 열기
2. 실행 → 로그 보기
3. 에러 메시지 확인
