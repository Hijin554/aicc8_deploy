/* ====== Common Post Request Function ====== */
export async function postRequest(url, options) {
  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  return await fetch(url, defaultOptions).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

/* ====== Common Put Request Function ====== */
export async function putRequest(url, options) {
  const defaultOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };
  return await fetch(url, defaultOptions).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // 204 No Content 응답 처리
    if (response.status === 204) return {};
    return response.json();
  });
}

/* ====== Common Patch Request Function ====== */
export async function patchRequest(url, options) {
  // PATCH 요청에도 JSON 헤더를 기본으로 설정해주는 것이 안전합니다.
  const defaultOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };
  return await fetch(url, defaultOptions).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

/* ====== Common Delete Request Function ====== */
export async function deleteRequest(url, options) {
  // DELETE 메서드 기본값 설정
  const defaultOptions = {
    method: 'DELETE',
    ...options,
  };
  return await fetch(url, defaultOptions).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 응답 상태 코드가 204(No Content)이면 json()을 호출하지 않고 빈 객체 반환
    if (response.status === 204) {
      return {};
    }

    return response.json();
  });
}

/* ====== Common GET Request Function ====== */
// 🌟 기존 코드의 매개변수 오타(option -> options)를 수정했습니다.
export async function getRequest(url, options) {
  return await fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

/* ====== Common UserID Request Function ====== */