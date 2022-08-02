import React from 'react';
import './style.css';
import ReactTooltip from 'react-tooltip';
import { formatDistanceToNow } from 'date-fns';

const IssueBox = ({ item }) => {
  return (
    <div>
      <div className="IssueBox">
        <div className="IssueContainer">
          {'pull_request' in item ? (
            <img
              src="https://i.ibb.co/V23yMV6/pull.png"
              alt=" Pull-request-icon"
            />
          ) : (
            <div className="OpenBug"></div>
          )}
          <div style={{ width: '100%' }}>
            <div className="IssueMainHeading">
              <div>
                <a href={item.html_url}>{item.title}</a>
                <span>
                  {item.labels.map((label) => (
                    <span
                      data-tip={label.description}
                      key={label.id}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: `#${label.color}`,
                      }}
                      className="Label"
                    >
                      {label.name}
                      <ReactTooltip
                        place="bottom"
                        className="ToolTip"
                        effect="solid"
                      />
                    </span>
                  ))}
                </span>
              </div>
              <div className="CommentContainer">
                <img
                  style={{ marginRight: 0, marginLeft: 2 }}
                  src="https://i.ibb.co/7zpLMDf/comment-box.png"
                  alt="comment-icon"
                />
                <span>{item.comments}</span>
              </div>
            </div>
            <div className="IssueContent">
              <span>#{item.number}</span>
              <span>
                {item.state}
                {'ed'}
              </span>
              <span>
                {formatDistanceToNow(new Date(item.created_at), {
                  addSuffix: true,
                })}
              </span>
              {'by'}
              <span>{item.user.login}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueBox;
