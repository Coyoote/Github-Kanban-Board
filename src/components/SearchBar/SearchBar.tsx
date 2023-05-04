import React from 'react';
import styles from './SearchBar.module.scss';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as issuesActions from '../../features/IssuesSlice';
import * as urlActions from '../../features/URLSlice';
const { Search } = Input;

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { url } = useAppSelector(state => state.url);
  const { hasError } = useAppSelector(state => state.issues);

  const setUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(urlActions.set(event.target.value));
  };

  const onSearch = () => {
    if (url) {
      const urlQuery = url.split('/').slice(3, 5).join('/');
      dispatch(issuesActions.fetchIssues(urlQuery));
    }
  };

  const urlError = url && hasError ? 'error' : '';

  return (
    <div className={styles.container}>
      <Search
        placeholder="Enter repo URL"
        allowClear
        size="large"
        enterButton="Load issues"
        onChange={setUrl}
        onSearch={onSearch}
        status={urlError}
      />
    </div>
  );
};
