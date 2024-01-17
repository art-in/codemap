export interface ProfileNode {
  name: string;
  weight: number;

  children?: Array<ProfileNode>;
}

type Profile = ProfileNode;

export default Profile;
