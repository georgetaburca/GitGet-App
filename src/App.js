import React, { useState, useEffect } from "react";
import { Card, Form, Image, Icon } from "semantic-ui-react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");

  const [error, setErr] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((result) => result.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({
    name,
    login,
    following,
    followers,
    public_repos,
    location,
    avatar_url,
  }) => {
    setName(name);
    setUsername(login);
    setFollowing(following);
    setFollowers(followers);
    setRepos(public_repos);
    setLocation(location);
    setAvatar(avatar_url);
  };

  const handleSearch = (n) => {
    setUserInput(n.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((result) => result.json())
      .then((data) => {
        if (data.message) {
          setErr(data.message);
        } else {
          setData(data);
          setErr(null);
        }
      });
  };

  return (
    <div>
      <div className="navbar">GitGet</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="username"
              name="github profile"
              onChange={handleSearch}
            />
            <Form.Button content="S E A R C H" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image
              src={avatar}
              wrapped
              ui={false}
              as="a"
              href="https://www.github.com"
              target="_blank"
            />

            <Card.Content>
              <Card.Header>{name}</Card.Header>

              <Card.Header>({userName})</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {following} Following
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {repos} Repositories
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {location} Location
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
