# 원티드 프리온보딩 프론트엔드 선발 과제

원티드 프리온보딩 선발 과제 프로젝트입니다.

-   지원자: 손수민
-   배포링크: [바로가기](https://wanted-pre-onboarding-frontend-pi-henna.vercel.app/)

## 프로젝트 실행 방법

1. root 경로에 .env 파일 생성 후 아래 내용 작성
    ```
    REACT_APP_API_URL = https://www.pre-onboarding-selection-task.shop/
    ```
2. 설치 및 실행
    ```
    $ npm install
    $ npm start
    ```

## 데모 영상
<table>
  <tr>
      <td>
          <img src="https://github.com/sonmansu/wanted-pre-onboarding-frontend/assets/80534651/de6c3aa3-5a0b-4a97-a384-0d40c3c27555" alt="회원가입, 로그인" width="500px"/>
      </td>
      <td>
          <img src="https://github.com/sonmansu/wanted-pre-onboarding-frontend/assets/80534651/0d9ff423-8f94-4def-8238-ce07c1cb5d88" alt="투두리스트" width="500px"/>
      </td>
  </tr>
  <tr>
      <td align="center" class="comment">회원가입, 로그인 페이지</td>
      <td align="center" class="comment">투두리스트 페이지</td>
  </tr>
    
</table>

           
## 구현 방식
### 1. API 파일 관리
- `apis/apiClient.ts`
    - axios instance를 만들어둠
    - 요청 interceptor을 이용하여 Authorization header 설정
- `apis/lib/`
    - 각 도메인 별 파일을 만들어서 해당 파일에 관련 api들을 작성함
        - ex. `apis/lib/todo.ts`
- 개선점: 요청, 응답 타입 지정 필요

### 2. 라우팅 설정
- react-router 라이브러리 사용
    - 많은 기능을 제공해주고 라우팅 쪽에서 가장 큰 커뮤니티를 가진 라이브러리. 다른 라이브러리에 비해 러닝커브가 높다는 단점이 있지만 사용해본 적이 있어서 문제 되지 않았음
- react-router v6에 도입된 RouterProvider 이용
    ⇒ data API를 사용가능하기 때문. 데이터를 미리 불러온다던지, 코드 스플리팅을 쉽게 처리 가능함
- 루트 경로 (`/`) 접근 시 투두 페이지 (`/todo`) 로 리다이렉션 되도록 함
- 개선점: 코드 스플리팅 처리 필요

### 3. 회원가입 & 로그인 (인증 & 인가)
- 인증&인가 - 각 페이지에서 useEffect로 토큰 확인 후 리다이렉션 처리 (개선점)
    ```tsx
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            navigate(`/${PATH.todo}`);
        }
    }, [navigate]);
    ```
    
- email, password 인풋 창을 객체로 관리
    ```tsx
    const [form, setForm] = useState<AuthForm>({
        email: "",
        password: "",
    });
    ```
    
- 유효성 검사 결과는 state가 아닌 일반 변수로 선언
    ⇒ form의 값이 변하면 리랜더링이 되기 때문에 일반 변수로 충분
    ```tsx
    let isValidEmail = form.email.includes("@");
    let isValidPassword = form.password.length >= 8;
    ```
    
- 인풋 값 유효성 처리
  
  폼에 입력된 것이 있을 때 & 정해진 기준을 통과하지 못했을 때 에러 메세지를 띄움
    ```tsx
    <AuthInput
          data-testid="email-input"
          placeholder="이메일을 입력해주세요"
          onChange={handleChangeInput}
          error={form.email.length > 0 && !isValidEmail}
      />
      {form.email.length > 0 && !isValidEmail && (
          <ErrorMessage>
              @가 포함된 유효한 이메일을 입력해주세요
          </ErrorMessage>
      )}
    ```

### 4. 투두리스트
**투두리스트 페이지**
- 컴포넌트가 화면에 처음 렌더링 됐을 때 `getTodos` api 호출시켜 응답 결과를 `todos` 상태 변수에 저장함
- `todos` 배열을 돌며 각 투두 아이템을 자식 `TodoItem` 컴포넌트에 전달
- 투두 수정, 삭제 메서드를 만들어 자식 `TodoItem` 컴포넌트에 전달
    - `setTodos` 를 호출하여 상태 변수 업데이트함

**투두 아이템**  
- `isInModify` 상태 변수로 현재 수정 중인지에 대한 여부를 구분함.
    - 현재 투두를 수정 중인 경우 리랜더링을 시켜 인풋 창을 보여주어야 하기 때문
- 투두 수정 or 삭제 버튼을 누르면 수정 or 삭제 api를 호출함. 
api 호출을 성공하면 부모로부터 전달 받은 투두 수정 or 삭제 메서드를 호출함.
    부모의 `setTodos`가 호출됨으로써 화면에 업데이트된 투두 리스트 목록이 랜더링 됨

## 폴더 구조

```
📦src
 ┣ 📂apis
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┗ 📜todo.ts
 ┃ ┗ 📜apiClient.ts
 ┣ 📂common
 ┃ ┗ 📂utils
 ┃ ┃ ┗ 📜constants.ts
 ┣ 📂pages
 ┃ ┣ 📂SignInPage
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂SignUpPage
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂TodoPage
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📜TodoItem.tsx
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📜router.tsx
 ┗ 📂styles
   ┣ 📜auth.ts
   ┣ 📜constants.ts
   ┗ 📜globalStyle.ts
```
