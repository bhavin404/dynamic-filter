import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Categories from "./Components/Categories";
import AllStores from "./Components/AllStores";
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from "./Home";
import Pagination from "./Components/Pagination";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Stores", href: "#", current: true },
];
const userNavigation = [
  
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  return (
  
 <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pagination" element={<Pagination />} /> {/* Route for Pagination component */}
        </Routes>
    </Router>

     
  
  );
}
