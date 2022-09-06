
import { useEffect, useState } from "react";
//
import type { NextPage } from "next";
import { useRouter } from "next/router";
// components
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileMenu from "../../components/Profile/ProfileMenu";
import ProfileMenuElements from "../../components/Profile/ProfileMenuElements";
// layouts
import PageContainer from "../../layouts/PageContainer";
//
import $api from "config";



const Profile: NextPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [profileStatus, setProfileStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      setProfileStatus("loading");
      if (router?.query?.id) {
        try {
          const res = await $api.get(`/user/getOne?id=${router.query.id}`);

          if (res.status === 200) {
            setProfile(res.data);
            setProfileStatus("success");
          }
        } catch (error) {
          setProfileStatus("error");
        }
      }
    })();
  }, [router.query?.id]);

  return (
    <PageContainer
      title={profile?.name ? `${profile.name} - youq.org` : undefined}
    >
      <div className="flex justify-between h-full">
        {profileStatus === "success" && (
          <>
            <div className="h-full w-[100%] lg:w-[490px]">
              <div className="max-w-[630px] lg:max-w-[330px] mx-auto h-full">
                <ProfileInfo profile={profile} />
              </div>
            </div>
            <div className="h-full w-[790px] hidden lg:block">
              <div className="max-w-[630px] mx-auto h-full">
                <ProfileMenu />
                <ProfileMenuElements />
              </div>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default Profile;
