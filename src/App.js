import { connect } from "react-redux";
import { useEffect } from 'react'
import * as actions from "./../src/actions/index"

const App = ({ loadUser, auth: { isAuthenticated, loading } }) => {
  useEffect(() => {
    loadUser();

  }, [])

  return "";
}
function mapStateToProps(state) {
  return {
    auth: state.user.isAuthenticated
  }
}

export default connect(mapStateToProps, actions)(App);