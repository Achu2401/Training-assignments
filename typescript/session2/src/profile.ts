interface Profile {
  displayName: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
}

function renderProfile(profile: Profile): string {
  let result = `Name: ${profile.displayName}\n`;

  result += `Bio: ${profile.bio ?? "No bio provided"}\n`;

  if (profile.website) {
    result += `Website: ${profile.website}`;
  }

  return result;
}

const profile1: Profile = {
  displayName: "Alice",
  bio: "Frontend Developer",
  website: "www.alice.com",
  avatarUrl: "avatar.jpg"
};

const profile2: Profile = {
  displayName: "Bob"
};

console.log(renderProfile(profile1));
console.log(renderProfile(profile2));

/*
If we write:

profile.bio.toUpperCase();

TypeScript gives:

'profile.bio' is possibly 'undefined'.

Because bio is optional, TypeScript forces us
to check if it exists before using string methods.
*/