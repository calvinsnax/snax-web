---
slug: "/blog/my-first-post"
date: "2022-06-18"
title: "권한 체크 로직 개선 방안"
---

## 권한 체크 방식

### 1. AccessLevel - 권한 수위 체크 방식

권한 레벨(accessLevel)은 숫자가 높을수록 권한이 높다는 것을 명시하는 방식입니다.
하나의 카테고리를 기준으로 권한 레벨의 차이는 절대적이어야 하며, 상위 레벨은 하위 레벨이 가진 모든 권한을 가져야 합니다.

### 2. Role - 역할 체크 방식

사용자, 프로젝트, 회사 등을 기준으로 사용자에게 부여된 역할(role)이 무엇인지에 따라 권한을 부여하는 방식입니다. 같은 권한 레벨을 가졌지만 역할 별로 접근 가능한 기능이 다를 때 사용합니다.

### 3. Hybrid - 복합 체크 방식

동원할 수 있는 모든 조건을 활용합니다. 예를 들어 권한 레벨은 `1 이상`이면서 `감리원|감리자`만 접근 가능한 기능을 다룰 때 효과적입니다.

---

## 종류별 권한 체크 기준

권한 체크는 크게 아래의 카테고리를 조건으로 하여 체크합니다. 각 항목은 비워둘 경우 모든 권한 레벨을 허용하는 것으로 간주합니다.

### 1. userRole - 사용자 역할

유저 정보를 기준으로 한 접근 권한입니다. 비로그인, 온보딩 등 사용자의 상태도 함께 반영되어 있습니다.

> 단일 선택

| 권한 레벨 | 항목명          | 설명               |
| --------- | --------------- | ------------------ |
| 0         | NOT_LOGGED_IN   | 비로그인 상태      |
| 1         | ON_BOARDING     | 온보딩 상태        |
| 2         | GENERAL_USER    | 로그인한 일반 유저 |
| 3         | COMPANY_MANAGER | 회사 관리자        |
| 4         | ADMIN           | 관리자             |
| 5         | SUPER_ADMIN     | 최고 관리자        |

### 2. businessArea - 사업 분야

유저가 속한 회사의 사업 분야입니다. 사업 분야에 따라 제공하는 기능이 다를 수 있기 때문에 사용하며, 말 그대로 각자의 영역을 명시하기 위함이 크기 때문에 어드민 또한 권한 레벨이 동일합니다. 따라서 사업 분야를 기준으로 접근 권한을 설정할 경우 어드민도 포함시켜야 합니다.

> 복수 선택

| 권한 레벨 | 항목명       | 설명           |
| --------- | ------------ | -------------- |
| 0         | NONE         | 정보 식별 불가 |
| 1         | BUILDER      | 건설사         |
| 1         | ARCHITECTURE | 건축사 사무소  |
| 1         | CLIENT       | 발주처         |
| 1         | CO_WORKER    | 협력사         |
| 1         | PM           | PM             |
| 1         | MATERIAL     | 자재 공급사    |
| 1         | SOLUTION     | 솔루션 공급사  |
| 1         | INTERIOR     | 인테리어       |
| 1         | ADMIN        | 어드민         |

### 3. projectRole - 프로젝트 역할

사용자에게 부여된 프로젝트에 대한 접근 권한입니다. 사용자에게 지정된 Role에 따라 접근할 수 있는 기능들이 다르기 때문에 참여/초대됨 여부를 제외하고 정상적으로 참여된 사용자의 권한 레벨은 모두 동일합니다. 프로젝트 매니저도 예외는 아닙니다.

> 복수 선택

| 권한 레벨 | 항목명               | 설명                      |
| --------- | -------------------- | ------------------------- |
| 0         | NONE                 | 미참여자                  |
| 1         | STANDBY              | 초대를 수락하지 않은 유저 |
| 2         | NORMAL               | 일반 참여자               |
| 2         | SECONDARY_SUPERVISOR | 감리원                    |
| 2         | PRIMARY_SUPERVISOR   | 감리자                    |
| 2         | SITE_MANAGER         | 현장소장                  |
| 2         | PROJECT_MANAGER      | 프로젝트 매니저           |

---

## APIs

### usePermission()

권한 처리를 위한 핵심 hook입니다. hook이 반환하는 객체의 프로퍼티 중 `permissions`는 실제 사용자에게 부여된 권한 정보를 담으며, `permissionCheck()` 함수는 권한 조건을 인자로 받아 권한 체크 결과를 `true/false`로 반환해줍니다.

```ts
const { permissions, permissionCheck } = usePermission()
```

#### permissions

```ts
const permissions = {
  user: {
    accessLevel: 2,
    role: 'GENERAL_USER',
  },
  businessArea: {
    accessLevel: 1,
    role: 'ARCHITECTURE',
  },
  project: {
    accessLevel: 0,
    role: 'NONE', // project 페이지가 아닐 경우 'NONE'으로 자동 처리됩니다.
  },
}
```

#### permissionCheck()

조건을 입력하면 사용자의 권한 여부를 검증하여 Boolean을 반환합니다.
단일 선택 항목의 경우 AccessLevel 또는 Role을 입력하며, 해당
AccessLevel의 상위 권한은 모두 동일한 권한을 가질 수 있습니다.

복수 선택 항목은 배열로 구성되어 있으며 첫번째 인자로 AccessLevel을,
두번째 인자로 AccessLevel의 배열로 이루어져 있습니다.
AccesssLevel 조건은 기본적으로 AccessLevel이 높은 유형에 대해
권한을 허용합니다.

```ts
const checkResult = permissionCheck({
  user: 'ADMIN', // or 4
  project: [2, ['NORMAL', 'PROJECT_MANAGER']],
})

console.log(checkResult) // true or false
```

### useUerInfo()

로그인한 사용자의 계정 정보와 로그인 여부를 반환합니다. 기존 useAuth로부터 관심사의 분리 및 타입 정의를 위해 분리된 hook입니다.

```ts
const { isLoggedIn, userInfo } = useUserInfo()

console.log(userInfo?.name) // 'CONSTRUCTOR'
```

### useProjectRole()

사용자의 프로젝트 권한을 검증하기 위한 hook으로 보통은 `usePermission()` hook에 내장되어 있지만 밖으로 꺼내어 사용할 수도 있습니다. 현재 접속 중인 프로젝트가 아닌 특정 프로젝트에 대한 권한 정보가 필요할 때 사용할 수 있습니다. 현재는 특정 프로젝트에 대한 자신의 권한만을 불러올 수 있지만 추후에는 `특정 사용자`, `특정 프로젝트`에 대한 권한 정보 및 이에 대한 `프로젝트 권한 검증` 기능을 추가할 예정입니다.

```ts
const { getProjectRole } = useProjectRole()

const projectRole = getProjectRole(projectId)
```
