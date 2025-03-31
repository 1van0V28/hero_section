const NUMBER_FEEDBACKS = 5
// const BUTTONS_LIKE_STATE = {
//     man: false,
//     man_1: false,
//     man_2: false,
//     woman: false,
//     woman_1: false,
// }
let POSITION_STATE = 0
let NAVIGATOR_STATE = "Главная"


const changeVisibleFeedbacks = function(viewerFeedbacksList, positionDelta) {
    if (positionDelta > 0) {
        viewerFeedbacksList[POSITION_STATE - 1].classList.add("viewer_feedback__feedback--hidden")
        viewerFeedbacksList[POSITION_STATE + 1].classList.remove("viewer_feedback__feedback--hidden")
    } else {
        viewerFeedbacksList[POSITION_STATE].classList.remove("viewer_feedback__feedback--hidden")
        viewerFeedbacksList[POSITION_STATE + 2].classList.add("viewer_feedback__feedback--hidden")
    }
}


const changeButtonsSwitchStyle = function(buttonsSwitchList) {
    if (POSITION_STATE === 0) {
        buttonsSwitchList[0].classList.add("container_button__button_action--disabled")
    } else if (POSITION_STATE === NUMBER_FEEDBACKS - 2) {
        buttonsSwitchList[1].classList.add("container_button__button_action--disabled")
    } else {
        buttonsSwitchList.forEach((button) => {
            button.classList.remove("container_button__button_action--disabled")
        })
    }
}


const handleButtonSwitchBackClick = function(viewerFeedbacksScroll, buttonsSwitchList) {
    if (!(POSITION_STATE === 0)) {
        const positionDelta = -1
        const newPosition = POSITION_STATE * 33.625 - 33.625

        viewerFeedbacksScroll.style.transform = `translateX(${-newPosition}vw)`
        POSITION_STATE -= 1

        changeVisibleFeedbacks(viewerFeedbacksList, positionDelta)
        changeButtonsSwitchStyle(buttonsSwitchList)
    }
}


const handleButtonSwitchForwardClick = function(viewerFeedbacksScroll, buttonsSwitchList) {
    if (!(POSITION_STATE === NUMBER_FEEDBACKS - 2)) {
        const positionDelta = 1
        const newPosition = POSITION_STATE * 33.625 + 33.625

        viewerFeedbacksScroll.style.transform = `translateX(${-newPosition}vw)`
        POSITION_STATE += 1 

        changeVisibleFeedbacks(viewerFeedbacksList, positionDelta)
        changeButtonsSwitchStyle(buttonsSwitchList)
    }
}


const setButtonsSwitchAction = function(controlPanel, viewerFeedbacksScroll) {
    const buttonsSwitchList = controlPanel.parentElement.querySelectorAll(".container_button__button_action")
    
    buttonsSwitchList[0].addEventListener("click", () => {handleButtonSwitchBackClick(viewerFeedbacksScroll, buttonsSwitchList)})
    buttonsSwitchList[1].addEventListener("click", () => {handleButtonSwitchForwardClick(viewerFeedbacksScroll, buttonsSwitchList)})
}


const handleButtonLikeClick = function(buttonLike) {
    buttonLike.classList.toggle("container_button__button_like--chosen")
    console.log("log")
}


const setButtonLikeAction = function(buttonsLikeList) {
    buttonsLikeList.forEach((buttonLike) => {
        buttonLike.addEventListener("click", () => {handleButtonLikeClick(buttonLike)})
    })
}


const handleNavigatorLinkClick = function(navigatorLink, navigatorLinksList) {
    if (navigatorLink.textContent === NAVIGATOR_STATE) {
        return
    }
    
    navigatorLink.classList.add("navigator__link--chosen")
    for (let i = 0; i < navigatorLinksList.length; i++) {
        const link = navigatorLinksList[i]
        if (link.textContent === NAVIGATOR_STATE) {
            link.classList.remove("navigator__link--chosen")
            break
        }
    }
    
    NAVIGATOR_STATE = navigatorLink.textContent
}


const setNavigatorLinksAction = function(navigatorLinksList) {
    navigatorLinksList.forEach((navigatorLink) => {
        navigatorLink.addEventListener("click", () => {handleNavigatorLinkClick(navigatorLink, navigatorLinksList)})
    })
}


const controlPanel = document.querySelector(".control_panel")
const viewerFeedbacksScroll = document.querySelector(".viewer_feedback__scroll")
const viewerFeedbacksList = viewerFeedbacksScroll.querySelectorAll(".viewer_feedback__feedback")
const buttonsLikeList = viewerFeedbacksScroll.querySelectorAll(".container_button__button_like")

const navigatorLinksList = document.querySelectorAll(".navigator__link")

setButtonsSwitchAction(controlPanel, viewerFeedbacksScroll)
setButtonLikeAction(buttonsLikeList)
setNavigatorLinksAction(navigatorLinksList)