$(function () {
  /* header */
  // 드로어 열기
  $(".lnb li:nth-child(2) i").on("click", function (e) {
    e.preventDefault();
    $(".m-drawer").addClass("active");
  });

  // 드로어 닫기
  $(".m-drawer .mobilemenu > a").on("click", function (e) {
    e.preventDefault();
    $(".m-drawer").removeClass("active");
  });

  // 아코디언 메뉴
  $(".m-acc-menu .has-sub > .acc-title").on("click", function (e) {
    e.preventDefault();

    var $parent = $(this).parent("li");

    $parent
      .siblings(".has-sub")
      .removeClass("open")
      .children(".acc-sub")
      .stop()
      .slideUp(200);

    $parent.toggleClass("open");
    $parent.children(".acc-sub").stop().slideToggle(200);
  });

  /* header line */
  $(".gnb li").on("mouseenter", function () {
    $(this).find(".line").css({ width: "80%" });
    $(this).css({ color: "brown" });
  });

  $(".gnb li").on("mouseleave", function () {
    $(this).find(".line").css({ width: "0" });
    $(this).css({ color: "#fff" });
  });

  /* visual */
  let i = 0;
  let total = $(".panel li").length;
  let stop;

  active();
  start();

  // 슬라이드 및 메뉴 활성화
  function active() {
    $(".panel li").stop().fadeOut().removeClass("on");
    $(".panel li").eq(i).stop().fadeIn().addClass("on");

    // 상단 메뉴 활성화
    $("#visual .menu > li > a").removeClass("on");
    $("#visual .menu > li > a").eq(i).addClass("on");

    // 진행 라인 애니메이션
    const line = $("#visual > .line");

    line.stop(true, true);
    line.css("width", "0px");

    line.animate({ width: $("#visual").width() * 0.7 + "px" }, 2000, "linear");

    // 너비 초기화를 브라우저에 반영
    line[0].offsetWidth;

    // 다시 왼쪽부터 오른쪽으로 진행
    line.animate({ width: "70%" }, 2000, "linear");

    // 하단 서브메뉴 활성화
    $("#visual .menu > li > .sub").removeClass("on");
    $("#visual .menu > li > .sub").eq(i).addClass("on");
  }

  // 자동 슬라이드 시작
  function start() {
    clearInterval(stop);

    stop = setInterval(function () {
      if (i == total - 1) {
        i = 0;
      } else {
        i = i + 1;
      }

      active();
    }, 2000);
  }

  // 상단 메뉴 클릭 시 슬라이드 변경
  $("#visual .menu > li > a").on("click", function (e) {
    e.preventDefault();

    i = $(this).parent().index();

    clearInterval(stop);
    active();
    start();
  });

  // 하단 서브메뉴에 마우스를 올리면 자동 슬라이드 정지
  $("#visual .menu .sub li").on("mouseenter", function () {
    clearInterval(stop);
  });

  // 하단 서브메뉴에서 마우스를 떼면 자동 슬라이드 재시작
  $("#visual .menu .sub li").on("mouseleave", function () {
    start();
  });
  /*con01 창*/
  $(window).on("scroll", function () {
    let sc = $(this).scrollTop();
    //   console.log(sc);
    let pos = $("#con01").offset().top;
    //   console.log(pos);
    if (sc >= pos - 800) {
      $("#con01").addClass("on");
    } else {
      $("#con01").removeClass("on");
    }
  });
  /* #con01 이미지 슬라이드 */
  let num = 0; //0번째 이미지 부터 시작
  let con01Stop; //자동슬라이드 멈춤

  const con01View = $("#container #con01 .right li:nth-of-type(4)");
  //.right에 4번째 li저장
  const con01Slide = con01View.find("a");
  //.right에 4번째 li a를 저장,움직이려는 요소
  const con01Count = con01Slide.find("img").length;

  //찾은 이미지의 개수 저장

  function con01Next() {
    //함수이름 설정
    con01Slide.stop().animate(
      //전체 a를 4번째 li너비 - 만큼 이동
      {
        "margin-left": -con01View.width() + "px",
      },
      1000,
      function () {
        //콜백함수 , 이동한 다음 첫번째 이미지를 a의 뒤로 보내기
        con01Slide.find("img:first-child").appendTo(con01Slide);
        con01Slide.css({ "margin-left": "0px" }); //a를 앞으로 보냈다가 이동하기

        num = (num + 1) % con01Count; //(0+1) %  3 = 1
        showCon01Text();
      },
    );
  }

  function showCon01Text() {
    $(".arrow p").hide(); //전체 내용을 숨기고
    $(".arrow p").eq(num).show(); //해당 이미지의 내용만 보이게
  }

  function con01Start() {
    clearInterval(con01Stop);

    con01Stop = setInterval(function () {
      con01Next();
    }, 3000);
  }

  con01Start();

  /* #con01 화살표 */
  $(".next").on("click", function (e) {
    e.preventDefault(); //원래 정해져 있는 기본동작을 막는 코드 (링크로 이동되지 않도록)
    clearInterval(con01Stop);
    con01Next();
    con01Start();
  });

  $(".prev").on("click", function (e) {
    e.preventDefault();
    clearInterval(con01Stop);

    con01Slide.stop();

    con01Slide.find("img:last-child").prependTo(con01Slide);
    con01Slide.css({
      "margin-left": -con01View.width() + "px",
    });

    con01Slide.animate({ "margin-left": "0px" }, 1000, function () {
      num = (num - 1 + con01Count) % con01Count;
      showCon01Text();
    });

    con01Start();
  });
  /* #con02 */

  $("#con02 ul li").on("mouseenter", function () {
    $(this).find("p:nth-of-type(1)").css({
      "writing-mode": "horizontal-tb",
    });
    $(this).find("p:nth-of-type(2)").show();

    $(this).children("i").hide();

    $(this).stop().animate({ width: "140%" });
  });

  $("#con02 ul li").on("mouseleave", function () {
    $(this).find("p:nth-of-type(1)").css({
      "writing-mode": "vertical-rl",
    });

    $(this).find("p:nth-of-type(2)").hide();

    $(this).children("i").show();

    $(this).stop().animate({ width: "25%" });
  });
  /*con02 창*/
  $(window).on("scroll", function () {
    let sc = $(this).scrollTop();
    //   console.log(sc);
    let pos = $("#con02").offset().top;
    //   console.log(pos);
    if (sc >= pos - 600) {
      $("#con02").addClass("on");
    } else {
      $("#con02").removeClass("on");
    }
  });
  /*con03 창*/
  $(window).on("scroll", function () {
    let sc = $(this).scrollTop();
    //   console.log(sc);
    let pos = $("#con02").offset().top;
    //   console.log(pos);
    if (sc >= pos - 600) {
      $("#con03").addClass("on");
    } else {
      $("#con03").removeClass("on");
    }
  });

  /* con04 슬라이드 */
  let pa;

  function con04Start() {
    clearInterval(pa);

    pa = setInterval(function () {
      let first = $("#con04 .con04_slide li:first-child");
      let w = first.outerWidth(true);

      $("#con04 .con04_slide")
        .stop(true, false)
        .animate({ marginLeft: -w }, 1000, "linear", function () {
          first.appendTo("#con04 .con04_slide");

          $("#con04 .con04_slide").css({
            marginLeft: "0px",
          });
        });
    }, 2000);
  }

  con04Start();

  /* #con04 화살표 */

  // 왼쪽 화살표 클릭
  $("#con04 .con04_arrow li:first-child").on("click", function () {
    clearInterval(pa);

    let slide = $("#con04 .con04_slide");
    let last = slide.find("li:last-child");
    let w = last.outerWidth(true);

    slide.stop(true, false);

    last.prependTo(slide);

    slide.css({ marginLeft: -w }).animate({ marginLeft: 0 }, 500, "linear");
    con04Start();
  });

  // 오른쪽 화살표 클릭
  $("#con04 .con04_arrow li:last-child").on("click", function () {
    clearInterval(pa);

    let slide = $("#con04 .con04_slide");
    let first = slide.find("li:first-child");
    let w = first.outerWidth(true);

    slide
      .stop(true, false)
      .animate({ marginLeft: -w }, 500, "linear", function () {
        first.appendTo(slide);

        slide.css({ marginLeft: 0 });
      });
    con04Start();
  });

  /*up버튼*/
  $(window).on("scroll", function () {
    let pos = $(this).scrollTop();
    if (pos >= 500) {
      $(".up").show();
    } else {
      $(".up").hide();
    }
  });
  $(".up").on("click", function () {
    $("html,body").animate({ scrollTop: "0px" }, 1000);
  });
});
