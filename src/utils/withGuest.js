import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withGuest (ComposedComponent) {

  class Authentication extends Component {

    componentDidMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push('/admin/category')
      } 
    }

    componentWillUpdate(nextProps) {
      if (this.props.isAuthenticated) {
        this.props.history.push('/admin/category')
      } 
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  })

  return connect(mapStateToProps, null)(Authentication);
}