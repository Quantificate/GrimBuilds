import React, {Component} from 'react';
import BuildCard from './BuildCard';

export default ({builds, err}) => {
  return err ? <div>Error: {err.message}</div> : builds ?
    <div className="container"><div className="row" id="cardholder">{builds.map(BuildCard)}</div></div> : <div>Load Throbber!</div>
}
