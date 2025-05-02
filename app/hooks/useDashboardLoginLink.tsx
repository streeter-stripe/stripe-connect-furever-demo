import {useEffect, useState} from 'react';

export const useDashboardLoginLink = () => {
  const [dashboardLoginLink, setDashboardLoginLink] = useState<string>();

  useEffect(() => {
    const fetchLink = async () => {
      const res = await fetch('/api/login_link');
      const data = await res.json();
      setDashboardLoginLink(data.url);
    };

    fetchLink();
  }, []);

  return {dashboardLoginLink};
};
