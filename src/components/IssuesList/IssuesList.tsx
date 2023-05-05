import React from 'react';
import { IssueCard } from '../IssueCard';
import styles from './IssuesList.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import { Issue } from '../../types/Issue';

type Props = {
  title: string,
  issues: Issue[],
  droppableId: string,
}

export const IssuesList: React.FC<Props> = ({
  issues,
  droppableId,
  title,
}) => {

  console.log(issues);

  if (!issues.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <div className={styles.list}>
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {issues.map((issue, index) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  index={index}
                />
              )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

    </div>
  );
};
