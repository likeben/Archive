const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      authorization: 'token' // however you get your token
    }
  }));
  return forward(operation);
});
console.log(authLink);

const ast = gql`
  query {
    allUsers {
      id
      name
      dateOfBirth
    }
  }
`;
const link = new HttpLink(
  {
    uri: 'http://localhost:60000/simple/v1/cjcbgyjhk00020190xbsykeec'
  },
  fetch
);
const observer = execute(link, {
  query: ast,
  operationName: null,
  variables: null
});
console.log(ast);
console.log(link);
console.log(observer);
// console.log(
//   link.request({
//     query: ast,
//     operationName: null,
//     variables: null
//   }),
//   'rrr'
// );

observer.subscribe({
  next: data => console.log(`received data `),
  error: error => console.log(`received error ${error}`),
  complete: () => console.log(`complete`)
});

makePromise(observer)
  .then(data => console.log(`received data`, data))
  .catch(error => console.log(`received error ${error}`));

// console.log(new ApolloLink());