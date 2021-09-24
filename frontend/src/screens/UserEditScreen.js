import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  FormControl,
  Input,
  Spacer,
  Link,
  Checkbox,
  FormLabel,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;
  /*TASK SOLUTION 
   *Point 1 => when we come second time on useredit screen it's not changing and still showing the the first user's data
   *  it's found that after first redirecting to userEdit page and going back to the userList page all the edit link's 
   *  becomes that privious user link.

   *  Solution => size prop on edit and delete icon was wrong prop as it was giving 6 error's on the console(but component
   *   was loaded and it was working fine) so i had changed size prop to height prop and error's where gone. but after
   *   refreshing whenever i clicked on any user edit button(icon) height of button will be increased and it will start
   *   overlaping the other two buttons with transparent bg so when ever i click on some other users edit button
   *   technically i was clicking on same user button so that's why i was going again to the previous user's edit page
   *   insted of current user . the correct prop is boxSize={6}
   *
   *
   *Point 2 => when we make a user admin in userEdit and return to UserList screen and again go to same User's edit
   *    screen then by default isAdmin checkbox should be checked but it's not .
   *
   *  solution => just change checked prop to isChecked prop . checked may be deprecated or only used in older version
   *    of chakra ui. now dispatch the USER_DETAILS_RESET on the userListScreen and now its working fine. we can change
   *    users role admin from false to true and true to false 
   *
   
   */
  console.log(user.name, user._id, userId);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        console.log(!user.name, user._id, userId);
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, match, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link as={RouterLink} to="/admin/userlist">
        Go Back
      </Link>
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            Edit User
          </Heading>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type="error">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              <FormControl id="isAdmin" isRequired>
                <FormLabel>Is Admin?</FormLabel>
                <Checkbox
                  size="lg"
                  colorScheme="teal"
                  isChecked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                >
                  Is Admin?
                </Checkbox>
              </FormControl>
              <Spacer h="3" />
              <Button
                isLoading={loading}
                type="submit"
                mt="4"
                colorScheme="teal"
              >
                Update
              </Button>
            </form>
          )}
        </FormContainer>
      </Flex>
    </>
  );
};

export default UserEditScreen;
