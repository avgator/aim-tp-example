import React from "react";
import { useRoutes } from "react-router-dom";
import { requireConfiguration } from "./hoc/configured";
import Rooms from "./components/rooms/rooms";
import Categories from "./components/categories/categories";
import Sources from "./components/sources/sources";
import Tags from "./components/channels/tags";
import Configuration from "./components/configuration/configuration";
import Folder from "./components/folder/folder";

const ConfiguredRooms = requireConfiguration(Rooms);
const ConfiguredCategories = requireConfiguration(Categories);
const ConfiguredSources = requireConfiguration(Sources);
const ConfiguredTags = requireConfiguration(Tags);
const ConfiguredFolder = requireConfiguration(Folder); 


const Panel = () => useRoutes([
  { path: "/", element: <Configuration/> },
  { path: "/rooms/", element: <ConfiguredRooms/> },
  { path: "/categories/", element: <ConfiguredCategories/>, children: [
    { path: "*", element: <ConfiguredCategories/> },] },
  { path: "/sources/", element: <ConfiguredSources/>, children: [
    { path: "*", element: <ConfiguredSources/> },] },
  { path: "/tags/", element: <ConfiguredTags/>, children: [
    { path: "*", element: <ConfiguredTags/> },] },
  { path: "/folder/", element: <ConfiguredFolder/>, children: [
    { path: "*", element: <ConfiguredFolder/> },] },
])

export default function App() {
  return (
    <div style={{width: '98vw', height: '98vh', margin: 'auto'}}>
      <Panel/>
    </div>
  )
}