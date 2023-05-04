import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import { Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { Issue } from '../../types/Issue';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);

type Props = {
  issue: Issue,
  index: number,
}

export const IssueCard: React.FC<Props> = ({ issue, index }) => {
  const { title, number, html_url, created_at, user, comments } = issue;
  const date = Date.parse(created_at);

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            size="small"
            title={<a href={html_url} target='_blank' rel="noreferrer">{title}</a>}

            style={{ width: 300, marginBottom: 10 }}
          >
            <p>#{number} opened <ReactTimeAgo date={date} locale="en-US" /></p>
            <p>
              <a
                href={user.html_url}
                target='_blank'
                rel="noreferrer"
              >
                {user.login}
              </a> | Comments: {comments} </p>
          </Card>
        </div>
      )}
    </Draggable >
  );
};
