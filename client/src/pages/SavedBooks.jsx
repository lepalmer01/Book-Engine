
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client'
import { REMOVE_BOOK, ME } from '../utils/GQL';
/*
    we need...
      useQuery and useMutation from @apollo/client
      and
      ME and REMOVE_BOOK from GQL
*/

import Auth from '../utils/auth';

const SavedBooks = () => {
  const [removeBook, removeBookState] = useMutation(REMOVE_BOOK)
  /*
    removeBookState.loading
    removeBookState.data
    meState.data
    meState.error
  */
  const meState = useQuery(ME)
  /*
    meState.data.me {
      user here!
    }
  */
  // const [userData, setUserData] = useState({});


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // try {
    //   const response = await deleteBook(bookId, token);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const updatedUser = await response.json();
    //   setUserData(updatedUser);
    //   // upon success, remove book's id from localStorage
    //   removeBookId(bookId);
    // } catch (err) {
    //   console.error(err);
    // }
    removeBook({
        variables: {
          bookId: bookId
        }
    })
  
  };

  if (removeBookState.data) {
    window.location.reload()
  }

  if (removeBookState.error) {
      console.log('error removing book')
      console.log(removeBookState.error)
  }


  if (meState.error) {
    return (
      <>
        Error getting your books!
      </>
    )
  }

  if (meState.loading) {
    return (
      <>
        Loading your books...
      </>
    )
  }

  // if it makes it here, that means theres no error and no loading

  let userData = meState.data.me

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
