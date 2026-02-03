# MARSHALL - API 명세서

> Base URL: `http://localhost:8000`

---

## 목차
1. [할일 조회](#1-할일-조회)
2. [할일 생성](#2-할일-생성)
3. [할일 수정](#3-할일-수정)
4. [완료 상태 업데이트](#4-완료-상태-업데이트)
5. [할일 삭제](#5-할일-삭제)

---

## 1. 할일 조회

특정 사용자의 모든 할일 목록을 조회합니다.

### Request

```
GET /get_tasks/:userId
```

| 파라미터 | 타입 | 위치 | 필수 | 설명 |
|----------|------|------|------|------|
| userId | string | path | O | 사용자 ID (Google OAuth sub) |

### Response

**Status Code: 200 OK**

```json
[
  {
    "_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "프로젝트 완료하기",
    "description": "AICC8 배포 앱 개발",
    "date": "2025-08-01",
    "iscompleted": false,
    "isimportant": true,
    "userid": "107634928371829384756",
    "created_at": "2025-02-03T14:30:00.000Z",
    "updated_at": "2025-02-03T14:30:00.000Z"
  },
  {
    "_id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "문서 작성",
    "description": "API 명세서 작성",
    "date": "2025-02-01",
    "iscompleted": true,
    "isimportant": false,
    "userid": "107634928371829384756",
    "created_at": "2025-02-01T10:00:00.000Z",
    "updated_at": "2025-02-02T15:30:00.000Z"
  }
]
```

### Example

```bash
curl -X GET http://localhost:8000/get_tasks/107634928371829384756
```

---

## 2. 할일 생성

새로운 할일을 생성합니다.

### Request

```
POST /post_task
```

**Headers**
```
Content-Type: application/json
```

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| title | string | O | 할일 제목 |
| description | string | O | 할일 설명 |
| date | string | O | 할일 날짜 (YYYY-MM-DD) |
| isCompleted | boolean | O | 완료 여부 |
| isImportant | boolean | O | 중요 여부 |
| userId | string | O | 사용자 ID (Google OAuth sub) |

```json
{
  "title": "새로운 할일",
  "description": "할일 상세 설명",
  "date": "2025-02-15",
  "isCompleted": false,
  "isImportant": true,
  "userId": "107634928371829384756"
}
```

### Response

**Status Code: 201 Created**

```json
{
  "msg": "Task Create Sucessfully"
}
```

### Example

```bash
curl -X POST http://localhost:8000/post_task \
  -H "Content-Type: application/json" \
  -d '{
    "title": "새로운 할일",
    "description": "할일 상세 설명",
    "date": "2025-02-15",
    "isCompleted": false,
    "isImportant": true,
    "userId": "107634928371829384756"
  }'
```

### Notes
- `_id`는 서버에서 UUID로 자동 생성됩니다.
- `created_at`, `updated_at`은 자동으로 현재 시간이 설정됩니다.

---

## 3. 할일 수정

기존 할일의 전체 정보를 수정합니다.

### Request

```
PUT /update_task
```

**Headers**
```
Content-Type: application/json
```

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| _id | string | O | 할일 고유 ID (UUID) |
| title | string | O | 수정할 제목 |
| description | string | O | 수정할 설명 |
| date | string | O | 수정할 날짜 (YYYY-MM-DD) |
| isCompleted | boolean | O | 완료 여부 |
| isImportant | boolean | O | 중요 여부 |

```json
{
  "_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "수정된 할일 제목",
  "description": "수정된 할일 설명",
  "date": "2025-02-20",
  "isCompleted": true,
  "isImportant": false
}
```

### Response

**Status Code: 200 OK**

```json
{
  "msg": "Task Updated Successfully"
}
```

### Example

```bash
curl -X PUT http://localhost:8000/update_task \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "수정된 할일 제목",
    "description": "수정된 할일 설명",
    "date": "2025-02-20",
    "isCompleted": true,
    "isImportant": false
  }'
```

### Notes
- `updated_at` 필드는 트리거에 의해 자동으로 현재 시간으로 갱신됩니다.

---

## 4. 완료 상태 업데이트

할일의 완료 상태만 업데이트합니다.

### Request

```
PATCH /update_completed_task
```

**Headers**
```
Content-Type: application/json
```

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| itemId | string | O | 할일 고유 ID (UUID) |
| isCompleted | boolean | O | 변경할 완료 상태 |

```json
{
  "itemId": "550e8400-e29b-41d4-a716-446655440000",
  "isCompleted": true
}
```

### Response

**Status Code: 200 OK**

```json
{
  "msg": "Task Updated Successfully"
}
```

### Example

```bash
curl -X PATCH http://localhost:8000/update_completed_task \
  -H "Content-Type: application/json" \
  -d '{
    "itemId": "550e8400-e29b-41d4-a716-446655440000",
    "isCompleted": true
  }'
```

### Notes
- 완료 상태만 빠르게 토글할 때 사용합니다.
- 전체 수정이 필요한 경우 `PUT /update_task`를 사용하세요.

---

## 5. 할일 삭제

특정 할일을 삭제합니다.

### Request

```
DELETE /delete_task/:itemId
```

| 파라미터 | 타입 | 위치 | 필수 | 설명 |
|----------|------|------|------|------|
| itemId | string | path | O | 할일 고유 ID (UUID) |

### Response

**Status Code: 200 OK**

```json
{
  "msg": "Task Deleted Successfully"
}
```

### Example

```bash
curl -X DELETE http://localhost:8000/delete_task/550e8400-e29b-41d4-a716-446655440000
```

---

## 에러 응답

API 요청 실패 시 다음과 같은 형식으로 에러가 반환됩니다.

### 서버 에러 (500)

```json
{
  "error": "Internal Server Error"
}
```

---

## 데이터베이스 스키마

### tasks 테이블

```sql
CREATE TABLE tasks (
    _id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    isCompleted BOOLEAN NOT NULL DEFAULT false,
    isImportant BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId TEXT NOT NULL
);
```

### 자동 업데이트 트리거

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_task_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

## API 요약

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/get_tasks/:userId` | 사용자의 모든 할일 조회 |
| POST | `/post_task` | 새 할일 생성 |
| PUT | `/update_task` | 할일 전체 수정 |
| PATCH | `/update_completed_task` | 완료 상태만 수정 |
| DELETE | `/delete_task/:itemId` | 할일 삭제 |

---

## 프론트엔드 API 호출 예시

### requests.js

```javascript
// GET 요청
export const getRequest = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// POST 요청
export const postRequest = async (url, options) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
  return response.json();
};

// PUT 요청
export const putRequest = async (url, options) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
  return response.json();
};

// PATCH 요청
export const patchRequest = async (url, options) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
  return response.json();
};

// DELETE 요청
export const deleteRequest = async (url, options) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
  return response.json();
};
```

---

## 서버 설정

### 환경 변수 (.env)

```env
PORT=8000

# PostgreSQL
DB_HOST=98.84.30.243
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
```

### CORS 설정

```javascript
const cors = require('cors');
app.use(cors());  // 모든 origin 허용
```
