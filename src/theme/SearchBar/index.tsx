// @ts-nocheck
import React from 'react'
import { useLocation } from '@docusaurus/router'
import { useActiveVersion, useVersions } from '@docusaurus/plugin-content-docs/client'
import { useDocsPreferredVersion } from '@docusaurus/theme-common'
import { usePluginData } from '@docusaurus/useGlobalData'
import { SearchBox, SearchButton } from '@orama/searchbox'
import { useOrama } from './useOrama'

interface PluginData {
  searchData: {
    current: { data: ArrayBuffer } | null
  }
  endpoint: { url: string; key: string } | null
  analytics: { apiKey: string; indexId: string; enabled: boolean } | null
  docsInstances: string[]
}

import React from 'react';
import { useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import { CustomSearchBar } from './CustomSearchBar';

interface PluginData {
  searchData: {
    current: { data: ArrayBuffer } | null;
  };
  endpoint: { url: string; key: string } | null;
  analytics: { apiKey: string; indexId: string; enabled: boolean } | null;
  docsInstances: string[];
}

export default function SearchBarWrapper() {
  const { pathname } = useLocation();
  const { docsInstances }: PluginData = usePluginData('@orama/plugin-docusaurus-v3') as PluginData;
  
  // We still track the current docs instance for search context
  const pluginId = docsInstances.filter((id: string) => pathname.includes(id))[0] || docsInstances[0];
  
  return <CustomSearchBar />;
}
