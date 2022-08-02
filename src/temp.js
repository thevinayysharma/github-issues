// useEffect(() => {
//   async function onLoad() {
//     await octokit
//       .request('GET /repos/{owner}/{repo}/issues', {
//         owner: 'facebook',
//         repo: 'react',
//       })
//       .then((res) => console.log(res.data));
//   }

//   onLoad();
// }, []);

// import { usePagination, DOTS } from '../../hooks/usePagination';
//generic pagination sourcecode for css and jsx from freecodecamp, saves time :P

<span className="Issues__State_item">Author</span>
<span className="Issues__State_item">Label</span>
<span className="Issues__State_item">Project</span>
<span className="Issues__State_item">Milestones</span>


: (
  <>
    <div key={item.id} className="Issue">
      <div className="IssueContainer">
        {'pull_request' in item ? (
          <img
            // src={gitPullRequestIcon}
            alt="icon"
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
                style={{ marginRight: 0 }}
                // src={commentIcon}
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
  </>
)}
</div>
);