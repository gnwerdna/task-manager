import React from "react";
import classes from "./Pagination.module.css";

const defaultProps = {
  initialPage: 1,
  pageSize: 5
};

class Pagination extends React.Component {
  state = {
    pager: {}
  };

  componentWillMount() {
    //set page if item array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(defaultProps.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setState(defaultProps.initialPage);
    }
  }

  setPage = page => {
    const { items, pageSize } = this.props;
    let pager = this.state.pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    //get new object for specified page
    pager = this.getPager(items.length, page, pageSize);

    //get new page of items from items array
    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    //update state
    this.setState({ pager: pager });

    //call change page function
    this.props.onChangePage(pageOfItems);
  };

  getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    //default page size is 5
    pageSize = pageSize || 5;

    //calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 3) {
      //let than 3 total pages to show all
      startPage = 1;
      endPage = totalPages;
    } else {
      //more than 3 page to calculate start page and end page
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    //calculate start and end item indexes for each page
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    //create an array of pages in page controls
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );
    return {
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      pages: pages
    };
  };
  render() {
    let pager = this.state.pager;
    if (!pager.pages || pager.pages.length <= 1) {
      // don't show pager if there is only one page
      return null;
    }
    return (
      <ul className={classes.Pagination}>
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => this.setPage(1)} href="/">
            First
          </a>
        </li>
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => this.setPage(pager.currentPage - 1)} href="/">
            Previous
          </a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={pager.currentPage === page ? "active" : ""}
          >
            <a onClick={() => this.setPage(page)} href="/">
              {page}
            </a>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => this.setPage(pager.currentPage + 1)} href="/">
            Next
          </a>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => this.setPage(pager.totalPages)} href="/">
            Last
          </a>
        </li>
      </ul>
    );
  }
}

export default Pagination;
