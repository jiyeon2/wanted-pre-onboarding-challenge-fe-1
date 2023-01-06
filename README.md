- create-react-app 사용

```
yarn install
yarn start
```

http://localhost:3000

- 사용한 라이브러리

```
react-router : 라우터 적용
```

- 폴더 구조

```
/src
    /routes : 라우터(페이지) 컴포넌트 모음
        /Home.tsx : 메인페이지
        /Auth.tsx : 로그인 페이지
        /Signup.tsx : 회원가입 페이지
        /Todos.tsx : 투두 목록 페이지(미완성)
    /components  : 라우터 페이지에 사용하는 컴포넌트 모음
        /Nav.tsx : 상단 네비게이션 바(링크 목록) 컴포넌트
        /CreateTodo.tsx : 투두 생성 영역 컴포넌트
        /TodoList.tsx : 투두 목록 영역 컴포넌트
        /TodoDetail.tsx : 투두 상세보기 영역(미작업)
    /context : context api 사용 파일 모음
        /authContext.tsx : 토큰 관리

- 해야할 작업
    - [ ] 투두 수정
    - [ ] 투두 삭제
    - [ ] 한 화면 내에서 투두 목록과 개별 투두 상세 확인
        - [ ] 새로고침시 현재 상태 유지
        - [ ] 개별 투두 조회순서에 따라 페이지 뒤로가기 통하여 조회 가능
    - [ ] 한 페이지 내에서 새로고침 없이 데이터가 정합성 갖추도록 (수정되는 todo 내용이 목록에서도 실시간 반영)
```
