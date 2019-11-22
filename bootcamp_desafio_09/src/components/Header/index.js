import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "~/store/modules/auth/actions";

import logo from "~/assets/logo.png";

import { Container, Content, Profile } from "./styles";

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="Meetapp" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <button onClick={handleSignOut} type="submit">
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
