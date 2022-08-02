import React from 'react';
import useFetch from '../../hooks/useFetch';
import { useState, useEffect , useMemo } from 'react';
import IssueBox from '../IssueBox';
import "./style.css";
import Pagination from "../Pagination/pagination";

let PageSize = 10;
let bool = true;
function IssueList() {;
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, data, error } = useFetch();
  const [issues, setIssues] = useState(data);
  const [openPullRequest, setOpenPullRequest] = useState(null);
  const [closedPullRequestCount, setClosedPullRequestCount] = useState(null);


  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize ;
    const lastPageIndex = firstPageIndex + PageSize;
    return issues.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


  useEffect(() => {
    setIssues((issues) => [...issues, ...data]);
  }, [data]);

  useEffect(() => {
    const calculateOpenClosePullRequest = () => {
      let open = 0, close = 0;
      issues.forEach((item) => {
        if (item.state === 'open') open++;
        else if (item.state === 'close') close++;
      });
      setOpenPullRequest(open);
      setClosedPullRequestCount(close);
    };
    calculateOpenClosePullRequest();
  }, [issues]);

  return (
    <div className="Container"> 
      <header className="header" >
        <p className="header__tittle">👋 Want to contribute to facebook/react?</p>
        <p className="header__para">If you have a bug or an idea, read the <a href="https://github.com/facebook/react/blob/9fcaf88d58cfd942e2fdd303ae8291dbf4828969/CONTRIBUTING.md"> contributing guidelines </a>before opening an issue.</p>
        <p className="header__para">If you're ready to tackle some open issues, <a href="https://github.com/facebook/react/contribute">we've collected some good first issues for you.</a></p>
       </header>
     <div className="IssueList">
      <div className="error" >{error && <strong>{error}</strong>}</div>
       <div className='IssueList__header'>
        <span className="IssueList__header__state--open">{openPullRequest ?? 0} Open</span>
        <span className="IssueList__header__state--closed"> ✓ {closedPullRequestCount ?? 0} Closed</span>
      </div>
      {currentPageData.map((item) => (
        <IssueBox
          key={item.id}
          item={...item}
        />
      ))}
      {loading && <strong className="loader">Loading...</strong>}
    </div>
    <Pagination
    className="pagination-bar"
    currentPage={currentPage}
    totalCount={issues.length}
    pageSize={PageSize}
    onPageChange={page => setCurrentPage(page)} />
    </div>
  );
}

export default IssueList;
