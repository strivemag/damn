import React from 'react';

import SurfBar from '../components/SurfBar';
import SearchResultsList from '../components/SearchResultsList';
import { API_URL } from '../config/constants';
import axios from 'axios';
// import '../styles/Searchbar.css';
class SurfContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { preventHideDropdown: false, showDropdown: false, term: '', posts: [], users: [], tags: [] }
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
  }

  search(term) {
    this.setState({ term });
    return axios({
      method: 'GET',
      url: `${API_URL}/search?q=${term}`
      // url: `${API_URL}/users/search?q=${term}`
    })
    .then(({data}) => {
      this.setState({
        users: data.hits.hits,
        website: data.websites
      });
    });
  }

  setPreventHideDropdown() {
    this.setState({ preventHideDropdown: true });
  }

  resetPreventHideDropdown() {
    this.setState({ preventHideDropdown: false });
  }

  hideDropdown() {
    if (!this.state.preventHideDropdown) {
      this.setState({ showDropdown: false });
    }
  }

  showDropdown() {
    this.setState({ showDropdown: true });
  }

  render () {
    return (
      <div id="surf-container">
        <SurfBar
          showDropdown={this.showDropdown}
          hideDropdown={this.hideDropdown}
          term={this.state.term}
          onSearchTermChange={(term) => {this.search(term)}}
        />
        {this.renderSearchResults()}
      </div>
    );
  }

  renderSearchResults() {
    if(!this.state.showDropdown ||  this.state.users.length === 0 ) {
      return;
    }

    return (
      <SearchResultsList
        setPreventHideDropdown={this.setPreventHideDropdown}
        resetPreventHideDropdown={this.resetPreventHideDropdown}
        term={this.state.term}
        users={this.state.users}
      />
    );
  }
}
export default SurfContainer;
