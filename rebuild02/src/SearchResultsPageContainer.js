/* This handles search logic. */
import React, {Component} from 'react';

/* These props are sent directly to getAllBuildsByCriteria in the backend model index.js
  classCompoundId, (this is an array with the two mastery id's inside)
  masteryId,
  playStyleId,
  purposeId,
  damageTypeId,
  srLevelId,
  cruciId,
  gearReqId
*/

export default class SearchResultsPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      builds,
      err
    }
  }

  componentWillMount(){
    this.search(this.props)
  }

  componentWillReceiveProps(props){
    this.search(props)
  }

  search(params){
    fetch('/builds/search', {method: "POST", body: params})
    .then(res => res.json()
      .then(body => {
        if (res.ok)
          return body
        throw new Error(res.err)
      })
    )
    .then(builds => this.setState({ builds }))
    .catch(err => this.setState({err}))
  }

  render() {
    return <this.props.component {...this.state} />
  }
}
