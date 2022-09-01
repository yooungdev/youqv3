"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = require("react");
const ProfileInfo_1 = __importDefault(require("../../components/Profile/ProfileInfo"));
const ProfileMenu_1 = __importDefault(require("../../components/Profile/ProfileMenu"));
const ProfileMenuElements_1 = __importDefault(require("../../components/Profile/ProfileMenuElements"));
// layouts
const PageContainer_1 = __importDefault(require("../../layouts/PageContainer"));
const trpc_1 = require("../../utils/trpc");
const Profile = (props) => {
    var _a, _b, _c;
    const router = (0, router_1.useRouter)();
    const profileMutate = trpc_1.trpc.useMutation(['profile.getOne']);
    const id = String((_a = router === null || router === void 0 ? void 0 : router.query) === null || _a === void 0 ? void 0 : _a.id);
    const input = {
        id: id
    };
    console.log(profileMutate);
    (0, react_1.useEffect)(() => {
        if (id) {
            try {
                profileMutate.mutate(input);
            }
            catch (error) {
            }
        }
    }, [id]);
    return (<PageContainer_1.default title={((_b = profileMutate === null || profileMutate === void 0 ? void 0 : profileMutate.data) === null || _b === void 0 ? void 0 : _b.name) ? `${(_c = profileMutate === null || profileMutate === void 0 ? void 0 : profileMutate.data) === null || _c === void 0 ? void 0 : _c.name} - youq.org` : undefined}>
            <div className="flex justify-between h-full">
                <div className="h-full w-[100%] lg:w-[490px]">
                    <div className="max-w-[630px] lg:max-w-[330px] mx-auto h-full">
                        <ProfileInfo_1.default profile={profileMutate === null || profileMutate === void 0 ? void 0 : profileMutate.data}/>
                    </div>
                </div>
                <div className="h-full w-[790px] hidden lg:block">
                    <div className="max-w-[630px] mx-auto h-full">
                        <ProfileMenu_1.default />
                        <ProfileMenuElements_1.default />
                    </div>
                </div>
            </div>
        </PageContainer_1.default>);
};
exports.default = Profile;
