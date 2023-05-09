import React from 'react';
import styles from './Issues.module.scss';
import { IssuesList } from '../IssuesList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { isUrlValid } from '../../utils/isUrlValid';
import * as issuesActions from '../../features/IssuesSlice';

export const Issues: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, inProgress, closed, hasError } = useAppSelector(state => state.issues);
  const { url } = useAppSelector(state => state.url);

  const urlError = !isUrlValid(url);

  if (urlError && url) {
    return (
      <div>Invalid URL</div>
    );
  }

  if (url && hasError) {
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

    dispatch(issuesActions.manageIssues(result));
  };

  return (
    <>
      <div className={styles.container}>
        <DragDropContext
          onDragEnd={handleOnDragEnd}
        >
          <IssuesList title="Todo" issues={todos} droppableId="Todo" />
          <IssuesList title="In Progress" issues={inProgress} droppableId="InProgress" />
          <IssuesList title="Closed" issues={closed} droppableId="Closed" />
        </DragDropContext>
      </div>
    </>
  );
};
