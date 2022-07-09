---
slug: "/post-test"
category: "story"
date: "2022-07-03"
title: "새로운 라우팅 스트럭처"
# featuredImage: "./thumbnail.jpg"
categoryTextColor: "#0a0a0a"
categoryBackgroundColor: "#ffb82d"
backgroundColor: "blue"
---

# 라우터 설정

본문에서는 새롭게 변경된 라우터 구조에 대한 설명과 함께 규칙, 사용 방법, 관련 컴포넌트 및 유틸리티 훅에 대해 안내합니다.

## 특징

- 컴포넌트 친화적
- 중첩 라우팅
- 주소와 매치되는 직관적인 파일 구조
- 라우터간 영향 최소화
- 높은 확장 가능성
- 적은 타이핑만으로 생성되는 자동 Breadcrumbs

## 규칙

- 최상위 라우터인 `'/'` 경로를 제외한 나머지는 `Routes > Route > Routes > Route` 방식으로 nested하게 작성합니다.
- `<Routes/>` 컴포넌트 아래에는 무조건 `<Route/>`가 위치해야 하며, 컴포넌트 Wrapping이 금지됩니다.
- `<Routes/>` 컴포넌트는 컴포넌트 Wrapping이 가능합니다.
- `<Routes/>` 컴포넌트를 Wrapping할 경우 해당하는 도메인에 대응되는 폴더에 `index.tsx`로 작성되어야 합니다.

## 예시

이 구조를 이해하는 가장 쉬운 방법은 직접 작성해보는 것입니다. 아래의 예시를 실제로 작성하여 구현해보세요. 이 구조에 담긴 의도와 작성법을 이해할 수 있습니다.

```tsx
// Router.tsx
import { Routes, Route } from "~/components/common";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route path="/projects" element={<ProjectsRoutes />} />
    </Routes>
  );
};

// routes/projects/index.tsx
import { useRouteMatch } from "react-router";
import { Routes, Route } from "~/components/common";

const ProjectsRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Routes>
      <Route exact path={path} element={<ProjectListPage />} />
      <Route path={path + "/:projectId"} element={<ProjectIdPage />} />
    </Routes>
  );
};

// routes/projects/ProjectListPage.tsx
import { useRouteMatch, generatePath } from "react-router";

const ProjectsListPage = () => {
  const { path } = useRouteMatch();
  const projects = useProjects();
  return (
    <ul>
      {projects.map((project) => {
        const detailPath = generatePath(path + "/:projectId", {
          projectId: project._id,
        });

        return (
          <li key={project._id}>
            <Link to={detailPath}>{project.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};
```

---

## 중첩 라우팅과 폴더 구조

새로운 라우터 구조는 react-router v5 버전의 중첩 라우팅 기능을 기반으로 작성됩니다. 다음의 경로를 코드로 만드는 방법을 생각해봅시다.

```
https://domain.com/post/1234
```

위 경로를 중첩 라우팅을 통해 작성하면 아래와 같습니다.

```tsx
const Router = () => {
  return (
    <Routes>
      // https://host.com/post/*
      <Route path="/post">
        <Routes>
          // https://host.com/post/:postId/*
          <Route path="/post/:postId" element={<ProjectDetailPage />} />
        </Routes>
      </Route>
    </Routes>
  );
};
```

위와 같은 중첩 라우트를 사용할 때에는 중첩되는 라우트들을 컴포넌트와 폴더로 잘 분리하는 것이 중요합니다. 위 내용으로 폴더와 컴포넌트를 생성하면 아래와 같습니다.

```
/pages
  - /post
    - index.tsx // 해당 경로의 하위 경로에 대한 라우트 정리
    - PostDetailPage.tsx // 해당 경로에 속한 페이지 컴포넌트
    ...
```

`/pages` 폴더 아래의 폴더들은 각각의 경로를 대변합니다. 예를 들어 `/pages/post` 폴더는 `https://host.com/post/` 주소에 대한 모든 라우팅 정보와 페이지 컴포넌트들을 담습니다. `/pages/post` 폴더 바로 아래에는 경로에 대한 라우팅 설정을 담당하는 index.tsx 파일과 경로에 속한 페이지들의 컴포넌트들이 담깁니다.

이것이 중첩 라우팅의 핵심입니다. 큰 feature 단위로 경로를 만들고, 해당 경로와 흡사한 형태로 폴더 구조를 만들면서 해당 경로가 가진 라우트 정보와 페이지 컴포넌트들을 쉽게 찾고, 관리할 수 있게 되는 것입니다.

---

## Components

### Router

가장 최상위 경로의 라우팅을 담당합니다. 이곳에 등록되지 않은 경로는 동작하지 않습니다. 프로젝트당 하나만 존재할 수 있으며, src의 루트 경로에 위치합니다.

```tsx
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "~/components/Route";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <ProjectsRoutes />
        <SellersRoutes />
        ...
      </Routes>
    </BrowserRouter>
  );
};
```

### Routes

react-router의 `<Switch/>` 컴포넌트를 Wrapping한 커스텀 컴포넌트입니다. 복수의 라우트를 다룰 때 이 컴포넌트로 감싸주어야 합니다.

> - 이 컴포넌트 아래에는 `<Route/>`와 `<Redirect/>`만 존재해야 합니다.
> - 이 컴포넌트 아래에 설정된 경로 이외의 경로로 접근할 경우 자동으로 `/404` 페이지로 리다이렉션됩니다.
> - react-router의 `<Route/>` 컴포넌트를 직접 사용해도 되지만, 대신 접근 권한 체크 기능을 사용할 수 없습니다.

```tsx
const ProjectsRoutes = () => {
  return (
    <Routes>
      Only <Route /> or <Redirect />
    </Routes>
  );
};
```

### Route

react-router의 `<Route/>` 컴포넌트를 Wrapping한 커스텀 컴포넌트입니다. react-router v5 버전을 기반으로 만들어졌으나, react-router v6의 스펙과 흡사한 props 형태를 취합니다. `avaliableUserLevel, availableBusinessAreaList` props를 통해 기존 `<AuthCheckRouter/>` 컴포넌트가 가졌던 접근 권한 설정 기능을 사용할 수 있습니다.

> - 상위 경로에서 접근 권한을 설정할 경우 상위 경로의 접근 권한을 먼저 체크한 후 하위 경로의 접근 권한을 검토합니다.
> - 상위 경로와 하위 경로의 접근 권한이 동일할 경우 하위 경로의 접근 권한은 설정하지 않아도 됩니다.

#### Example

```tsx
const ProjectsRoutes = () => {
  return (
    <Routes>
      <Route path="/projects" exact element={<ProjectsListPage />} />
      <Route
        path="/projects/:projectId"
        avaliableUserLevel="USER_LEVEL_USER"
        availableBusinessAreaList={[
          "BUILDER",
          "ARCHITECTURE",
          "CLIENT",
          "PM",
          "ADMIN",
          "INTERIOR",
          "CO_WORKER",
        ]}
        element={<ProjectDetailPage />}
      />
    </Routes>
  );
};
```

#### Type

```ts
interface RouteProps {
  path?: Path | readonly Path[];
  exact?: boolean;
  element?: React.ReactNode;
  children?: React.ReactNode;
  availableUserLevel?: AvailableUserLevel;
  availableBusinessAreaList?: AvailableBusinessAreaList[];
}
```

---

## ✅ Path를 효율적으로 사용하는 방법

Router 컴포넌트에서 시작되어 퍼져나간 route path들은 그 수가 많아질수록 관리하기 어려워지며, 변경점을 확인하기 어렵습니다. 따라서 route 설정이 바뀌면 관련된 로직에서도 변경된 path가 반영되어야 하지만 다소 번거롭고 반영 과정 자체가 Human error로 이어질 수 있습니다.

```tsx
// ❌ Bad case
const Router = () => {
  return (
    <Routes>
      <Route path="/post/:postId" ... />
    </Routes>
  )
}

const PostListPage = () => {
  const history = useHistory()
  const posts = usePost()

  const handleClickPost = (postId) => {
    history.push(`/before/${post.id}`) // wrong🤬!
  }

  return (
    <ul>
      {posts.map((post) => (
        <li>
          <article
            key={post._id}
            onClick={() => handleClickPost(post._id)}>
            {post.title}
          </article>
        </li>
      ))}
    </ul>
  )
}
```

위의 `안좋은 사례`처럼 path를 다루는 로직들이 많아질수록 관리 포인트가 증가하는 것을 방지하기 위해 아래의 path 관리법을 소개합니다.

### 1. CONSTANT - 절대 경로 관리

모든 경로들을 상수로 만들어두면 한 곳에서 path를 관리할 수 있고, 관심사의 분리도 가능해집니다. path의 params에 원하는 값을 넣기 위해 아래의 예시도 참고해보세요.

```ts
// routePaths.ts
export const PATH_DASHBOARD = '/'

export const PATH_NOTICES = '/notices'
export const PATH_NOTICES_LIST = PATH_NOTICES
export const PATH_NOTICES_CREATE = PATH_NOTICES + '/create'
export const PATH_NOTICES_DETAIL = PATH_NOTICES + '/:postId'
export const PATH_NOTICES_MODIFY = PATH_NOTICES + '/:postId/modify'

// Router.tsx
const Router = () => {
  reutrn(
    <Routes>
      <Route path={PATH_NOTICES_MODIFY} />
    </Routes>
  )
}

// NoticeDetailPage.tsx
import { generatePath } from 'react-router'

...

const modifyPath = generatePath(PATH_NOTICES_MODIFY, {
  noticeId,
})
```

react-router의 `generatePath()` 함수를 사용하면 손쉽게 path에 알맞은 path를 주입해줄 수 있습니다. 물론, 타입스크립트도 지원합니다.

### 2. useRouteMatch() - 상대 경로 관리

react-router의 `useRouteMatch()` hook은 실행된 위치의 match 정보를 반환합니다. 즉, hook의 실행된 위치의 path를 불러올 수 있습니다. 상수를 활용한 절대 경로 관리 방식의 경우 매 페이지들의 경로를 모두 작성해주어야 하지만 `useRouteMatch()`를 사용하면 path는 Router 컴포넌트 안에서만 존재하게 됩니다.

```tsx
// Router.tsx
const Router = () => {
  return (
    <Routes>
      <Route path="/post/:postId" element={<PostDetailPage />} />
    </Routes>
  )
}

// NoticeDetailPage.tsx
import { generatePath, useRouteMatch } from 'react-router'

...

const { path } = useRouteMatch() // path === '/post/:postId'
const modifyPath = generatePath(path, {
  postId
})
```

`useRouteMatch()`를 활용할 경우 가장 큰 장점은 route path의 변경점을 로직에 반영할 수 있는 것 뿐만 아니라 해당 feature의 route path와 관련 로직들이 모두 상대적이게 된다는 것입니다. 상대적으로 경로를 관리할 경우 상위 path를 손쉽게 바꿀 수 있으며, 라우트와 관련 로직들을 다른 곳에서도 재활용할 수 있다는 장점이 있습니다. 아래의 예시를 추가로 확인해보세요.

```tsx
// Router.tsx
const Router = () => {
  return (
    <Routes>
      <Route path="/admin/:postId" element={<PostDetailPage />} />
      <Route path="/user/:postId" element={<PostDetailPage />} />
      <Route path="/company/:postId" element={<PostDetailPage />} />
    </Routes>
  )
}

// PostDetailPage.tsx
import { generatePath, useRouteMatch } from 'react-router'

...

type Path = '/admin/:postId' | '/user/:postId' | '/company/:postId' // 이해를 돕기 위한 타입 명시
const { path: Path } = useRouteMatch()

const modifyPath = generatePath(path, {
  postId
})
```

---

## Breadcrumb 설정

### Basic usage

`<Route>` 컴포넌트의 `title` 속성을 사용하면 페이지의 타이틀과 브레드크럼을 설정할 수 있습니다.

```tsx
<Route path="/project" title="프로젝트" />
```

### Nested title

상위 라우트와 하위 라우트의 `path`가 동일할 경우 exact를 사용하여 타이틀을 구분하여 작성할 수 있습니다. 일반적으로 이 방식을 사용하여 대분류와 목록 제목을 별도로 입력합니다.

```tsx
const Router = () => {
  return (
    <Routes>
      // 브레드크럼: -
      <Route path="/projects" title="프로젝트">
        <Routes>
          // 브레드크럼: 프로젝트
          <Route exact path="/projects" title="프로젝트 목록" />
          // 브레드크럼: 프로젝트 > 프로젝트 보기
          <Route path="/projects/:projectId" title="프로젝트 보기" />
        </Routes>
      </Routes>
    </Routes>
  )
}

```

### Rule

브레드크럼을 표출하기 위해 사용하는 Breadcrum 컴포넌트는 기본적으로 `exact`를 사용하여 `match`를 검사하며, 현재 `location.pathname`과 동일한 `path`에 대해서는 브레드크럼을 표시하지 않습니다. 현재 위치에 대한 타이틀은 이미 페이지 상단에 표시되고 있기 때문입니다.

```tsx
<Route path="/chat" title="실시간 채팅방" />
```
