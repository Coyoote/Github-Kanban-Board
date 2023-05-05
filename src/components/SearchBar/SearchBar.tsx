import React from 'react';
import styles from './SearchBar.module.scss';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as issuesActions from '../../features/IssuesSlice';
import * as urlActions from '../../features/URLSlice';
import { isUrlValid } from '../../utils/isUrlValid';
const { Search } = Input;

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { url } = useAppSelector(state => state.url);
  const { loading } = useAppSelector(state => state.issues);

  const urlError = isUrlValid(url) ? '' : 'error';

  const onSearch = () => {
    const urlQuery = url.split('/').slice(3, 5).join('/');
    dispatch(issuesActions.fetchIssues(urlQuery));
  };

  const setUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(urlActions.set(event.target.value));
  };


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
        disabled={loading}
      />
    </div>
  );
};
