import { UrlEndpoints } from 'src/app/shared/class/urlEndpoints.class';

export const endpointsMap = (params: string[] | number[]) => {
  return {
    [UrlEndpoints.leagues]: `${UrlEndpoints.leagues}`,
    [UrlEndpoints.standings]: `${UrlEndpoints.standings}`,
  };
};
