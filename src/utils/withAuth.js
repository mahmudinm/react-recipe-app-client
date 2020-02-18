import React, { Component } from 'react';
import { connect } from 'react-redux';  
import { Redirect } from 'react-router-dom';
import jwt from 'jwt-decode'

export default function withAuth (ComposedComponent, allowedRoles) {

  class Authentication extends Component {

    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/')
      } 
    }

    UNSAFE_componentWillUpdate(nextProps) {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/')
      } 
    }

    render() {
      // Implement Role base access list
      let roles; 
      if (this.props.token !== null) {
        roles = jwt(this.props.token);

        // menggunakan method some bukan includes soalnya data yang di berikan array bukan string
        if(allowedRoles.some(v => roles.roles.includes(v))) {
          return <ComposedComponent {...this.props} />
        } 
        
      } else {
        return <Redirect to="/admin/recipe"/>
      }

    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  })

  return connect(mapStateToProps, null)(Authentication);
}