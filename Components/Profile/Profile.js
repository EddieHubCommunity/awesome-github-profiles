import { Card } from "primereact/card";

function Profile({ profile }) {
  return (
    <Card
      className="p-mr-4 p-mb-4"
      key={profile.name}
      header={<img src={profile.image} alt={profile.name} />}
      title={profile.name}
      subTitle={profile.username}
      style={{ width: "200px" }}
    ></Card>
  );
}

export default Profile;
