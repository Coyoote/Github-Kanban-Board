import React from 'react';
import styles from './Issues.module.scss';
import { IssuesList } from '../IssuesList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import * as issuesActions from '../../features/IssuesSlice';

export const Issues: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, inProgress, closed, hasError } = useAppSelector(state => state.issues);
  const { url } = useAppSelector(state => state.url);

  const urlError = !url.includes('github.com');

  if (urlError && url) {
    return (
      <div>Invalid URL</div>
    );
  }

  if ((hasError) && url) {
    return (
      <div>Error fetching issues</div>
    );
  }

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId
      && destination.index === source.index) {
      return;
    }

    dispatch(issuesActions.reorderIssues(result));
  };

  return (
    <>
      <div className={styles.container}>
        <DragDropContext
          onDragEnd={handleOnDragEnd}
        >
          <IssuesList title="Todo" issues={todos} droppableId="todo" />
          <IssuesList title="In Progress" issues={inProgress} droppableId="inProgress" />
          <IssuesList title="Closed" issues={closed} droppableId="closed" />
        </DragDropContext>
      </div>
    </>
  );
};
