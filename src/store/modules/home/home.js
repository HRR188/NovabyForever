/**
 * Created by harryliu on 2/6/17.
 */
import api from '../../../api/api'

let initBanner = function (banners) {
    let list = banners;
    list.forEach(function (li,index) {
        li.active = index === 0;
    });
    return list
};

let initArtists = function (artists) {
    let list = artists;
    list.forEach(function (li,index) {
        li.active = index === 0;
    });
    return list
};

const home = {
    namespaced: true,
    state:{
        banners:[],
        abstract:{},
        intro:{},
        projects:{},
        artists:[],
        artistsAbstract:{},
        picksAbstract:{},
        picksList:[],
        partners:[],
        model3D:{}
    },
    mutations:{
        setData:function (state,data) {
            state.banners = initBanner(data.banners.lists);
            state.abstract = data.banners.abstract;
            state.intro = data.intro;
            state.projects = data.projects;
            state.picks = data.picks;
            state.picksAbstract = data.picks.abstract;
            state.picksList = data.picks.lists;
            state.artists = initArtists(data.artists.lists);
            state.artistsAbstract = data.artists.abstract;
            state.partners = data.partner;
            state.model3D = data.model
        },
        changeBanner:function (state,n) {
            state.banners.forEach(function (banner,index) {
                banner.active = index === n;
            })
        },
        autoChangeBanner:function (state) {
            let ind = 0;
            state.banners.forEach(function (banner,index) {
                if(banner.active){
                    ind = index
                }
            });
            if(ind < state.banners.length-1){
                state.banners.forEach(function (banner,index) {
                    banner.active = index === ind+1;
                })
            }
            else{
                state.banners.forEach(function (banner,index) {
                    banner.active = index === 0;
                })
            }
        },
        changeArtist:function (state) {
            let current = 0;
            state.artists.forEach(function (artist,index) {
                if(artist.active){
                    current = index;
                    artist.active = false
                }
            });
            if(current === state.artists.length-1){
                state.artists[0].active = true;
            }
            else{
                state.artists[current+1].active = true;
            }
        }
    },
    actions:{
        async getHomePageData (context) {
            let resp = await api.getData('homeData');
            context.commit('setData',resp.data.data);
            return true
        }
    }
};

export default home