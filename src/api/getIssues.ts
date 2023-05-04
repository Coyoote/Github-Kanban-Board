import { Issue } from '../types/Issue';
import { RepoInfo } from '../types/RepoInfo';
import { client } from '../utils/fetch';

export const getRepoIssues = async (url: string) => {
  return client.get<Issue[]>(`/repos/${url}/issues`);
};

export const getRepoIssuesWithAsignee = async (url: string) => {
  return client.get<Issue[]>(`/repos/${url}/issues?assignee=*`);
};

export const getClosedIssues = async (url: string) => {
  return client.get<Issue[]>(`/repos/${url}/issues?state=closed`);
};

export const getRepoInfo = async (url: string) => {
  return client.get<RepoInfo>(`/repos/${url}`);
};

