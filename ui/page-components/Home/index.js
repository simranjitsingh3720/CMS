// import Router from 'next/router';
import { useContext } from 'react';
// import styled from 'styled-components';
// import { useSession } from '../../context/session';
import SessionContext from '../_app/index';

// function Home({ authUrl }) {
// const { session } = useSession();

// const handleClickOnSignIn = (rawSheetUrl) => {
//   const [sheetUrl] = (rawSheetUrl || '').split('#');
//   if (session) {
//     if (sheetUrl) {
//       Router.push(`/app/api/create?spreadsheetUrl=${sheetUrl}`);
//     } else {
//       Router.push('/app/apis');
//     }
//   } else {
//     const serializedState = JSON.stringify({ sheetUrl });
//     const param = `&state=${serializedState}`;
//     if (sheetUrl) {
//       const url = `${authUrl + param}`;
//       window.location.href = url;
//     } else {
//       Router.push(authUrl);
//     }
//   }
// };
//   return (
//     <Container
//       session={session}
//       onClickSignIn={() => handleClickOnSignIn()}
//     >
//       Hello World
//     </Container>
//   );
// }
// const Container = styled.div`
//   min-height: 100vh;
// `;
// export default Home;
function Home() {
  const user = useContext(SessionContext);
  console.log(user);
  // const { session } = useSession();
  return (
    <div>
      Hello world
      {user ? <h1>{user.firstName}</h1> : null}
    </div>
  );
}

export default Home;
