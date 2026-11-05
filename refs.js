// 文獻來源：每一型有哪些研究支持。整理自《九型參考文獻.md》與合併版文件第 06 章。
// 每筆：who（作者與年份）、theory（理論或概念名稱）、what（一句白話說明）、risk（true＝負面效果的依據）
window.REFS = {
  'safe-base': [
    { who: 'Bowlby 1969、1988', theory: '依附理論：安全港與安全基地', what: '孩子需要一個受驚時可以回來的地方，也需要一個放心出去探索的起點，兩者都在，孩子才敢冒險。' },
    { who: 'Ainsworth 等人 1978', theory: '陌生情境實驗', what: '有安全依附的嬰兒在照顧者在場時更願意探索，照顧者本身就是探索的保證。' },
    { who: 'Verschueren & Koomen 2012', theory: '臨時依附對象', what: '老師也能提供安全港與安全基地的功能，關鍵在老師對孩子的敏感度，角色設計借用這個位置。' },
    { who: 'Bandura 1977、1997', theory: '自我效能', what: '親身完成小而真實的成功，是「我做得到」信念最強的來源，所以安全基地要把孩子推出去試。' },
    { who: 'Verschueren & Koomen 2012，Roorda 等人 2011', theory: '師生關係中的依賴向度', what: '孩子黏住老師就無法把老師當基地去探索，依賴高的孩子適應較差，這是撤除路徑的理由。', risk: true },
    { who: 'Aguiar 等人 2019', theory: '擬社會分手', what: '孩子會對螢幕角色產生真實的關係感，角色消失時需要告別畫面。', risk: true },
    { who: 'Common Sense Media 2025', theory: 'AI 陪伴對未成年的風險評估', what: '社交型 AI 容易讓孩子過度依賴並分享私密資訊，所以禁止留人句與保密承諾。', risk: true }
  ],
  coach: [
    { who: 'Vygotsky 1978', theory: '近側發展區', what: '孩子「自己做不到、有人幫一下就做得到」的區間，是最有效的學習區，鷹架教練只在這個區間出手。' },
    { who: 'Wood、Bruner & Ross 1976', theory: '鷹架', what: '這個詞的出處。觀察幼兒與家教互動後提出：幫忙要剛好補上孩子缺的那一塊。' },
    { who: 'van de Pol、Volman & Beishuizen 2010', theory: '鷹架三特徵', what: '依程度調整、逐步撤除、責任轉移。四段式介入與撤除階梯都照這三條設計。' },
    { who: 'Kestin 等人 2025', theory: 'AI 家教不直接給答案', what: '會提問、會等的 AI 家教，學習效果高於課堂講授，給答案的版本效果差。' },
    { who: 'Csikszentmihalyi，Bjork', theory: '心流與合意困難', what: '題目剛好有點難，孩子才會投入，提示給太多，難度就消失了。' },
    { who: 'Loewenstein 1994', theory: '好奇心的資訊缺口', what: '先讓孩子猜，再揭曉，好奇心來自知道與想知道之間的缺口。' },
    { who: 'Seligman 1975', theory: '習得無助', what: '幫太多、撤太慢，孩子會學到「反正有人會幫」而停止嘗試。', risk: true }
  ],
  peer: [
    { who: 'Johnson & Johnson 1989', theory: '社會互賴理論', what: '合作型的目標結構讓成就、互相喜歡與社會支持一起上升，一起做勝過互相排名。' },
    { who: 'Roseth、Johnson & Johnson 2008', theory: '148 篇研究的統合分析', what: '對象是 12 到 15 歲：合作型結構成就較高、同儕關係較好，競爭型與個人式沒有優勢。' },
    { who: 'Park 等人 2017', theory: '同儕型機器人示範態度', what: '和一個會卡住、會說「我再試一次」的機器人同伴一起玩，幼兒的成長心態更高、面對難題更堅持。' },
    { who: 'Chi & Wylie 2014', theory: 'ICAP 架構', what: '兩方來回接著對方的想法往下講，才算互動層，共學夥伴的互相解釋要做到這一層。' },
    { who: 'Mallawaarachchi 等人 2024', theory: '共同使用', what: '孩子和親子、同學一起用數位產品，效果優於獨自使用，所以設計成可一起登入。' },
    { who: 'Kahn 等人 2012', theory: '兒童對社交型機器的認知', what: '9 到 12 歲最容易把角色當成有心智的朋友，角色要主動說明自己是角色。' },
    { who: 'Festinger 1954', theory: '社會比較理論', what: '同儕並肩時自然會比較，比較的對象要設計成孩子自己的上一次。', risk: true }
  ],
  guardian: [
    { who: 'Grolnick & Pomerantz 2009', theory: '結構與控制的區分', what: '結構是規則、期待與可預測的後果，連到勝任感，控制是施壓與侵入。守護者只做結構。' },
    { who: 'Farkas & Grolnick 2010', theory: '學業領域的結構', what: '清楚一致的規則、可預測的後果、說明理由、提供回饋，四件事構成有效的結構。' },
    { who: 'Baumrind 1991，Maccoby & Martin 1983', theory: '教養風格四象限', what: '溫暖與要求兩個軸：高溫暖又高要求的權威型結果最好，這是全部角色的預設人格。' },
    { who: 'Patall、Cooper & Robinson 2008', theory: '家長作業參與的研究綜合', what: '家長參與作業的各種方式裡，「一起訂規則」和成就的關係最強。' },
    { who: 'Wang、Pomerantz & Chen 2007，張映芬 2020', theory: '行為控制與心理控制', what: '合理規範與督導和學業正相關，用罪惡感、收回愛來操控，在美國、中國與台灣都預測較差情緒。' },
    { who: 'Chao 1994', theory: '華人的「管」', what: '嚴格與關愛並存，守護者的語氣可以堅定，但要附理由。' },
    { who: 'Kaplan', theory: '注意力恢復理論', what: '刻意的注意力會疲勞，離開螢幕、看自然景物能恢復，休息提醒要說具體可做的事。' },
    { who: 'Barber 1996', theory: '父母心理控制', what: '「你這樣我很失望」這類話預測孩子的內化問題，列為守護者的紅線。', risk: true },
    { who: 'Stattin & Kerr 2000', theory: '父母監控的再詮釋', what: '父母知道孩子的事主要來自孩子主動說，監控與追問反而讓孩子隱瞞，所以系統只知道時間。', risk: true }
  ],
  mirror: [
    { who: 'Gottman、Katz & Hooven 1996、1997', theory: '情緒教練五步驟', what: '覺察、同理、命名、設界線、一起解決問題，受這樣對待的孩子三年後社交能力較好。' },
    { who: 'Murray 等人 2015', theory: '共同調節', what: '孩子先借用大人的冷靜與策略，再慢慢內化成自己的，所以角色永遠比孩子平靜一級。' },
    { who: 'Zinsser、Gordon & Jiang 2021', theory: '24 篇研究的統合分析', what: '示範、回應、教導三類情緒教養都有支持，效果普遍偏小，要搭配真人。' },
    { who: 'Common Sense Media 2025', theory: 'AI 陪伴對未成年的風險評估', what: '24% 青少年曾向 AI 分享真名、位置或秘密，角色要推回真人、禁止蒐集秘密。' },
    { who: 'Gottman 等人的「放任型」', theory: '只接納、不教策略', what: '接住情緒但從未進到設界線與一起解決，孩子的情緒調節結果不如教練型。', risk: true }
  ],
  explain: [
    { who: 'Rosenshine 2012', theory: '教學原則', what: '小步驟呈現新教材、示範、大量提問、檢查理解、糾正錯誤，講解模式的「一步、最多三句」來自這裡。' },
    { who: 'Deci & Ryan 1985、2000', theory: '自我決定理論：勝任感', what: '勝任感是三大基本心理需求之一，講解讓孩子「學會」來滿足它。' },
    { who: 'Bastani 等人 2025', theory: '有護欄的 AI 家教', what: '直接給答案的 AI 在收回後讓學生表現更差，有護欄、只提示的版本消除了傷害。' },
    { who: 'VanLehn 2011', theory: '步驟層級回饋', what: '一步一步給回饋的家教效果接近真人，整題講完的效果差很多。' },
    { who: 'Chi & Wylie 2014', theory: 'ICAP 架構', what: '「換你說一次」把孩子從被動聽講拉到主動建構。' },
    { who: 'van de Pol 等人 2010，Vasquez 等人 2016', theory: '責任轉移', what: '講解若從未把責任交還孩子，孩子會持續依賴，替孩子做與動機負相關。', risk: true }
  ],
  review: [
    { who: 'Rogers 1957', theory: '無條件正向關注', what: '不帶評價地看見一個人，是改變的必要條件，回顧卡片只描述、從不打分數。' },
    { who: 'Siegel & Bryson 2020', theory: '4S：被看見', what: '「被看見」指大人感知並反映孩子的內在經驗，看的是裡面，表現在其次。' },
    { who: 'Mueller & Dweck 1998，Brummelman 等人 2016', theory: '過程讚美', what: '讚美做了什麼，優於讚美聰明或誇大讚美，誇大讚美反而傷低自尊的孩子。' },
    { who: 'Hattie & Timperley 2007', theory: '回饋的四個層次', what: '任務與過程層的回饋效果最好，關於「人」的稱讚效果最差。' },
    { who: 'Deci、Koestner & Ryan 1999', theory: '外在獎勵與內在動機', what: '口頭的具體回饋提升內在動機，預期中的獎勵削弱它，對兒童效果較小，所以更要具體。' },
    { who: 'Hanus & Fox 2015', theory: '排行榜與徽章的實驗', what: '16 週課堂實驗，排行榜與徽章降低動機與成績，回顧只看孩子自己的紀錄。', risk: true },
    { who: 'Elliot 1999', theory: '成就目標理論', what: '孩子覺得「在被看、被評價」時容易轉向表現目標，進而焦慮與逃避，所以卡片由孩子主動叫出。', risk: true },
    { who: 'Lepper 等人 1973', theory: '意外獎勵實驗', what: '一次性的意外獎勵無害，但重複的隨機排程會變成變動比率增強，因此取消隨機出現。', risk: true }
  ],
  challenge: [
    { who: 'Johnson & Johnson 1989', theory: '社會互賴理論：適當競爭', what: '任務簡單、輸贏不重要、所有人都有機會贏時，競爭可以增加趣味，所以只在熟練後出現。' },
    { who: 'Roseth、Johnson & Johnson 2008', theory: '148 篇研究的統合分析', what: '12 到 15 歲的競爭型結構在成就與同儕關係上沒有優勢，競爭只適合當狹窄的遊戲情境。' },
    { who: 'Deterding 等人 2011', theory: '遊戲化的定義', what: '在非遊戲情境使用遊戲設計元素，本模式只取「跟自己比」這一項。' },
    { who: 'Iyengar & Lepper 1999', theory: '文化與選擇', what: '亞裔美國兒童在信任的人參與選擇時動機最高，競爭在台灣脈絡的效果可能和西方不同。' },
    { who: 'Elliot 1999，Pekrun 等人 2006、2009', theory: '表現逃避目標', what: '專注於避免失敗、隱藏不足的孩子，與羞愧、焦慮、無望感正相關，比賽對這類孩子有害。', risk: true },
    { who: 'Brummelman 等人 2014', theory: '低自尊與評價壓力', what: '低自尊的孩子在評價情境更逃避挑戰，所以情緒簽到低落時禁止出現。', risk: true },
    { who: 'Hanus & Fox 2015，Pan、Yuan & Chou 2025', theory: '遊戲化的長期效果', what: '排行榜降低動機，PaGamO 的延宕測驗沒有改善，遊戲化短期有效、長期常消退。', risk: true }
  ],
  story: [
    { who: 'Bandura 1977', theory: '社會學習理論：觀察學習', what: '人會透過觀察他人的行為與後果來學習，用故事示範就夠，角色不需要在場。' },
    { who: 'Bandura 1997', theory: '自我效能：替代經驗', what: '看到跟自己類似的人成功，會提升「我也做得到」的信念，所以用孩子那顆的長大版。' },
    { who: 'Markus & Nurius 1986', theory: '可能自我', what: '人對「我可能變成什麼樣」的想像是動機來源，長大版提供理想自我的具體形象。' },
    { who: 'Morgenroth、Ryan & Peters 2015', theory: '榜樣的動機理論', what: '榜樣有三種功能：示範行為、代表可能性、激勵，故事卡主要做第一種。' },
    { who: 'Park 等人 2017', theory: '示範勝過說教', what: '同儕型角色示範「卡住之後做什麼」，效果好於講道理。' },
    { who: 'Yeager 等人 2019，Sisk 等人 2018', theory: '成長心態介入的效果量', what: '光講成長心態的效果很小，所以故事講具體方法，不講口號。' },
    { who: 'Lockwood & Kunda 1997', theory: '超級明星與我', what: '榜樣的成就若讓人覺得自己達不到，會導致自我貶低，所以故事要有失敗、結果要普通。', risk: true }
  ]
};
