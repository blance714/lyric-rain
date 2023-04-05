import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.span`
  
`

const randomHiragana = [
  'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'
]

const randomPunctuation = [
  '。', '、', '「', '」', '！', '？', '【', '】', '々', '〆'
]

const randomRadicals = [
  '⺀','⺁','⺂','⺃','⺄','⺅','⺆','⺇','⺈','⺉','⺊','⺋','⺌','⺍','⺎','⺏','⺐','⺑','⺒','⺓','⺔','⺕','⺖','⺗','⺘','⺙','⺛','⺜','⺝','⺞','⺟','⺠','⺡','⺢','⺣','⺤','⺥','⺦','⺧','⺨','⺩','⺪','⺫','⺬','⺭','⺮','⺯','⺰','⺱','⺲','⺳','⺴','⺵','⺶','⺷','⺸','⺹','⺺','⺻','⺼','⺽','⺾','⺿','⻀','⻁','⻂','⻃','⻄','⻅','⻆','⻇','⻈','⻉','⻊','⻋','⻌','⻍','⻎','⻏','⻐','⻑','⻒','⻓','⻔','⻕','⻖','⻗',
]

const randomSimplify = [
  0x4e00,0x4e01,0x4e03,0x4e07,0x4e08,0x4e09,0x4e09,0x4e0a,
  0x4e0b,0x4e0d,0x4e0e,0x4e10,0x4e11,0x4e13,0x4e14,0x4e16,
  0x4e18,0x4e19,0x4e1a,0x4e1b,0x4e1c,0x4e1d,0x4e22,0x4e24,
  0x4e25,0x4e27,0x4e2a,0x4e2d,0x4e30,0x4e32,0x4e34,0x4e38,
  0x4e39,0x4e3a,0x4e3b,0x4e3d,0x4e3e,0x4e43,0x4e45,0x4e48,
  0x4e49,0x4e4b,0x4e4c,0x4e4d,0x4e4e,0x4e4f,0x4e50,0x4e52,
  0x4e53,0x4e54,0x4e56,0x4e58,0x4e59,0x4e5d,0x4e5e,0x4e5f,
  0x4e60,0x4e61,0x4e66,0x4e70,0x4e71,0x4e73,0x4e86,0x4e88,
  0x4e89,0x4e8b,0x4e8c,0x4e8e,0x4e8f,0x4e91,0x4e92,0x4e94,
  0x4e95,0x4e9a,0x4e9b,0x4ea1,0x4ea4,0x4ea5,0x4ea6,0x4ea7,
  0x4ea9,0x4eab,0x4eac,0x4ead,0x4eae,0x4eb2,0x4eba,0x4ebf,
  0x4ec0,0x4ec1,0x4ec5,0x4ec6,0x4ec7,0x4eca,0x4ecb,0x4ecd,
  0x4ece,0x4ed1,0x4ed3,0x4ed4,0x4ed6,0x4ed7,0x4ed8,0x4ed9,
  0x4ee3,0x4ee4,0x4ee5,0x4eea,0x4eec,0x4ef0,0x4ef2,0x4ef6,
  0x4ef7,0x4efb,0x4efd,0x4eff,0x4f01,0x4f0a,0x4f0d,0x4f0f,
  0x4f10,0x4f11,0x4f17,0x4f18,0x4f19,0x4f1a,0x4f1e,0x4f1f,
  0x4f20,0x4f24,0x4f26,0x4f2a,0x4f2f,0x4f30,0x4f34,0x4f36,
  0x4f38,0x4f3a,0x4f3c,0x4f43,0x4f46,0x4f4d,0x4f4e,0x4f4f,
  0x4f51,0x4f53,0x4f55,0x4f59,0x4f5b,0x4f5c,0x4f60,0x4f63,
  0x4f69,0x4f73,0x4f7f,0x4f84,0x4f88,0x4f8b,0x4f8d,0x4f9b,
  0x4f9d,0x4fa0,0x4fa3,0x4fa5,0x4fa6,0x4fa7,0x4fa8,0x4fae,
  0x4faf,0x4fb5,0x4fbf,0x4fc3,0x4fc4,0x4fca,0x4fcf,0x4fd0,
  0x4fd7,0x4fd8,0x4fdd,0x4fe1,0x4fe9,0x4fed,0x4fee,0x4fef,
  0x4ff1,0x4ffa,0x500d,0x5012,0x5014,0x5018,0x5019,0x501a,
  0x501f,0x5021,0x5026,0x503a,0x503c,0x503e,0x5047,0x504e,
  0x504f,0x505a,0x505c,0x5065,0x5076,0x5077,0x507f,0x5080,
  0x5085,0x508d,0x50a8,0x50ac,0x50b2,0x50bb,0x50cf,0x50da,
  0x50e7,0x50f5,0x50fb,0x5112,0x5121,0x513f,0x5141,0x5143,
  0x5144,0x5145,0x5146,0x5148,0x5149,0x514b,0x514d,0x5151,
  0x5154,0x515a,0x515c,0x5162,0x5165,0x5168,0x516b,0x516c,
  0x516d,0x5170,0x5171,0x5173,0x5174,0x5175,0x5176,0x5177,
  0x5178,0x517b,0x517c,0x517d,0x5180,0x5185,0x5188,0x518c,
  0x518d,0x5192,0x5195,0x5197,0x5199,0x519b,0x519c,0x51a0,
  0x51a4,0x51ac,0x51af,0x51b0,0x51b2,0x51b3,0x51b5,0x51b6,
  0x51b7,0x51bb,0x51c0,0x51c4,0x51c6,0x51c9,0x51cc,0x51cf,
  0x51d1,0x51db,0x51dd,0x51e0,0x51e1,0x51e4,0x51eb,0x51ed,
  0x51ef,0x51f0,0x51f3,0x51f6,0x51f8,0x51f9,0x51fa,0x51fb,
  0x51fd,0x51ff,0x5200,0x5201,0x5203,0x5206,0x5207,0x520a,
  0x5211,0x5212,0x5217,0x5218,0x5219,0x521a,0x521b,0x521d,
  0x5220,0x5224,0x5228,0x5229,0x522b,0x522e,0x5230,0x5236,
  0x5237,0x5238,0x5239,0x523a,0x523b,0x523d,0x5242,0x5243,
  0x524a,0x524d,0x5251,0x5254,0x5256,0x5265,0x5267,0x5269,
  0x526a,0x526f,0x5272,0x527f,0x5288,0x529b,0x529d,0x529e,
  0x529f,0x52a0,0x52a1,0x52a3,0x52a8,0x52a9,0x52aa,0x52ab,
  0x52b1,0x52b2,0x52b3,0x52bf,0x52c3,0x52c7,0x52c9,0x52cb,
  0x52d2,0x52d8,0x52df,0x52e4,0x52fa,0x52fe,0x52ff,0x5300,
  0x5305,0x5306,0x5308,0x5315,0x5316,0x5317,0x5319,0x5320,
  0x5323,0x532a,0x5339,0x533a,0x533b,0x533e,0x533f,0x5341,
  0x5343,0x5347,0x5348,0x534a,0x534e,0x534f,0x5351,0x5352,
  0x5353,0x5355,0x5356,0x5357,0x535a,0x535c,0x5360,0x5361,
  0x5362,0x5364,0x5366,0x5367,0x536b,0x5370,0x5371,0x5373,
  0x5374,0x5375,0x5377,0x5378,0x537f,0x5382,0x5385,0x5386,
  0x5389,0x538b,0x538c,0x5395,0x5398,0x539a,0x539f,0x53a2,
  0x53a6,0x53a8,0x53bb,0x53bf,0x53c2,0x53c8,0x53c9,0x53ca,
  0x53cb,0x53cc,0x53cd,0x53d1,0x53d4,0x53d6,0x53d7,0x53d8,
  0x53d9,0x53db,0x53e0,0x53e3,0x53e4,0x53e5,0x53e6,0x53e8,
  0x53ea,0x53eb,0x53ec,0x53ed,0x53ee,0x53ef,0x53f0,0x53f2,
  0x53f3,0x53f6,0x53f7,0x53f8,0x53f9,0x53fc,0x53fd,0x5401,
  0x5403,0x5404,0x5406,0x5408,0x5409,0x540a,0x540c,0x540d,
  0x540e,0x540f,0x5410,0x5411,0x5413,0x5415,0x5417,0x541b,
  0x541d,0x541e,0x541f,0x5420,0x5426,0x5427,0x5428,0x5429,
  0x542b,0x542c,0x542d,0x542e,0x542f,0x5431,0x5434,0x5435,
  0x5438,0x5439,0x543b,0x543c,0x5440,0x5446,0x5448,0x544a,
  0x5450,0x5455,0x5458,0x545b,0x545c,0x5462,0x5468,0x5473,
  0x5475,0x547b,0x547c,0x547d,0x5486,0x548c,0x548f,0x5490,
  0x5492,0x5495,0x5496,0x5499,0x54a7,0x54a8,0x54aa,0x54ac,
  0x54b1,0x54b3,0x54b8,0x54bd,0x54c0,0x54c1,0x54c4,0x54c6,
  0x54c8,0x54cd,0x54ce,0x54d1,0x54d7,0x54df,0x54e5,0x54e8,
  0x54e9,0x54ea,0x54ed,0x54ee,0x54f2,0x54fa,0x54fc,0x5501,
  0x5506,0x5507,0x5509,0x5510,0x5520,0x5524,0x5527,0x552c,
  0x552e,0x552f,0x5531,0x553e,0x5543,0x5544,0x5546,0x554a,
  0x5561,0x5564,0x5565,0x5566,0x5570,0x5578,0x557c,0x5582,
  0x5584,0x5587,0x5589,0x558a,0x5598,0x559c,0x559d,0x55a7,
  0x55b3,0x55b7,0x55bb,0x55c5,0x55d3,0x55dc,0x55e1,0x55e4,
  0x55e6,0x55fd,0x5600,0x5601,0x5609,0x5631,0x5632,0x5634,
  0x5636,0x5639,0x563f,0x5668,0x5669,0x566a,0x568e,0x56a3,
  0x56b7,0x56bc,0x56ca,0x56da,0x56db,0x56de,0x56e0,0x56e2,
  0x56e4,0x56ed,0x56f0,0x56f1,0x56f4,0x56fa,0x56fd,0x56fe,
  0x5703,0x5706,0x5708,0x571f,0x5723,0x5728,0x5730,0x573a,
  0x573e,0x5740,0x5747,0x574a,0x574e,0x574f,0x5750,0x5751,
  0x5757,0x575a,0x575b,0x575d,0x575e,0x575f,0x5760,0x5761,
  0x5764,0x5766,0x576a,0x576f,0x5777,0x5782,0x5783,0x5784,
  0x578b,0x5792,0x579b,0x57a2,0x57a6,0x57ab,0x57ae,0x57c2,
  0x57c3,0x57cb,0x57ce,0x57df,0x57e0,0x57f9,0x57fa,0x5802,
  0x5806,0x5815,0x5821,0x5824,0x582a,0x5830,0x5835,0x584c,
  0x5851,0x5854,0x5858,0x585e,0x586b,0x5883,0x5885,0x5893,
  0x5899,0x589e,0x58a8,0x58a9,0x58c1,0x58d5,0x58e4,0x58eb,
  0x58ee,0x58f0,0x58f3,0x58f6,0x58f9,0x5904,0x5907,0x590d,
  0x590f,0x5915,0x5916,0x591a,0x591c,0x591f,0x5927,0x5929,
  0x592a,0x592b,0x592d,0x592e,0x592f,0x5931,0x5934,0x5937,
  0x5938,0x5939,0x593a,0x5944,0x5947,0x5948,0x5949,0x594b,
  0x594f,0x5951,0x5954,0x5955,0x5956,0x5957,0x5960,0x5962,
  0x5965,0x5973,0x5974,0x5976,0x5978,0x5979,0x597d,0x5982,
  0x5984,0x5986,0x5987,0x5988,0x5992,0x5993,0x5996,0x5999,
  0x59a5,0x59a8,0x59b9,0x59bb,0x59c6,0x59ca,0x59cb,0x59d0,
  0x59d1,0x59d3,0x59d4,0x59da,0x59dc,0x59e5,0x59e8,0x59fb,
  0x59ff,0x5a01,0x5a03,0x5a04,0x5a07,0x5a18,0x5a1c,0x5a29,
  0x5a31,0x5a36,0x5a46,0x5a49,0x5a5a,0x5a74,0x5a76,0x5a7f,
  0x5a92,0x5a9a,0x5ab3,0x5ac1,0x5ac2,0x5ac9,0x5acc,0x5ae1,
  0x5ae9,0x5b09,0x5b50,0x5b54,0x5b55,0x5b57,0x5b58,0x5b59,
  0x5b5d,0x5b5f,0x5b63,0x5b64,0x5b66,0x5b69,0x5b75,0x5b7d,
  0x5b81,0x5b83,0x5b85,0x5b87,0x5b88,0x5b89,0x5b8b,0x5b8c,
  0x5b8f,0x5b97,0x5b98,0x5b99,0x5b9a,0x5b9b,0x5b9c,0x5b9d,
  0x5b9e,0x5ba0,0x5ba1,0x5ba2,0x5ba3,0x5ba4,0x5ba6,0x5baa,
  0x5bab,0x5bb0,0x5bb3,0x5bb4,0x5bb5,0x5bb6,0x5bb9,0x5bbd,
  0x5bbe,0x5bbf,0x5bc2,0x5bc4,0x5bc6,0x5bc7,0x5bcc,0x5bd2,
  0x5bd3,0x5bdd,0x5bde,0x5bdf,0x5be1,0x5be5,0x5be8,0x5bf8,
  0x5bf9,0x5bfa,0x5bfb,0x5bfc,0x5bff,0x5c01,0x5c04,0x5c06,
  0x5c09,0x5c0a,0x5c0f,0x5c11,0x5c14,0x5c16,0x5c18,0x5c1a,
  0x5c1d,0x5c24,0x5c31,0x5c38,0x5c3a,0x5c3c,0x5c3d,0x5c3e,
  0x5c3f,0x5c40,0x5c41,0x5c42,0x5c45,0x5c48,0x5c49,0x5c4a,
  0x5c4b,0x5c4e,0x5c4f,0x5c51,0x5c55,0x5c5e,0x5c60,0x5c61,
  0x5c65,0x5c6f,0x5c71,0x5c79,0x5c7f,0x5c81,0x5c82,0x5c94,
  0x5c96,0x5c97,0x5c9b,0x5ca9,0x5cad,0x5cb3,0x5cb8,0x5ce1,
  0x5ce6,0x5ced,0x5cf0,0x5cfb,0x5d07,0x5d0e,0x5d14,0x5d16,
  0x5d29,0x5d2d,0x5d4c,0x5dcd,0x5ddd,0x5dde,0x5de1,0x5de2,
  0x5de5,0x5de6,0x5de7,0x5de8,0x5de9,0x5deb,0x5dee,0x5df1,
  0x5df2,0x5df4,0x5df7,0x5dfe,0x5e01,0x5e02,0x5e03,0x5e05,
  0x5e06,0x5e08,0x5e0c,0x5e10,0x5e15,0x5e16,0x5e18,0x5e1a,
  0x5e1c,0x5e1d,0x5e26,0x5e2d,0x5e2e,0x5e38,0x5e3d,0x5e45,
  0x5e4c,0x5e54,0x5e55,0x5e62,0x5e72,0x5e72,0x5e73,0x5e74,
  0x5e76,0x5e78,0x5e7b,0x5e7c,0x5e7d,0x5e7f,0x5e84,0x5e86,
  0x5e87,0x5e8a,0x5e8f,0x5e90,0x5e93,0x5e94,0x5e95,0x5e97,
  0x5e99,0x5e9c,0x5e9e,0x5e9f,0x5ea6,0x5ea7,0x5ead,0x5eb5,
  0x5eb6,0x5eb7,0x5eb8,0x5ec9,0x5eca,0x5ed3,0x5ef6,0x5ef7,
  0x5efa,0x5f00,0x5f02,0x5f03,0x5f04,0x5f0a,0x5f0f,0x5f13,
  0x5f15,0x5f1b,0x5f1f,0x5f20,0x5f25,0x5f26,0x5f27,0x5f2f,
  0x5f31,0x5f39,0x5f3a,0x5f52,0x5f53,0x5f55,0x5f62,0x5f64,
  0x5f69,0x5f6a,0x5f6c,0x5f6d,0x5f70,0x5f71,0x5f79,0x5f7b,
  0x5f7c,0x5f80,0x5f81,0x5f84,0x5f85,0x5f88,0x5f8a,0x5f8b,
  0x5f90,0x5f92,0x5f92,0x5f97,0x5f98,0x5fa1,0x5faa,0x5fae,
  0x5fb7,0x5fbd,0x5fc3,0x5fc5,0x5fc6,0x5fcc,0x5fcd,0x5fd7,
  0x5fd8,0x5fd9,0x5fe0,0x5fe7,0x5feb,0x5ff1,0x5ff5,0x5ffd,
  0x5fff,0x6000,0x6001,0x600e,0x6012,0x6014,0x6015,0x6016,
  0x601c,0x601d,0x6020,0x6025,0x6027,0x6028,0x602a,0x602f,
  0x603b,0x6043,0x604b,0x604d,0x6050,0x6052,0x6055,0x6062,
  0x6064,0x6068,0x6069,0x606c,0x606d,0x606f,0x6070,0x6073,
  0x6076,0x607c,0x6084,0x6089,0x608d,0x6094,0x609f,0x60a0,
  0x60a3,0x60a6,0x60a8,0x60ac,0x60af,0x60b2,0x60b4,0x60bc,
  0x60c5,0x60ca,0x60cb,0x60d1,0x60d5,0x60dc,0x60e0,0x60e6,
  0x60e7,0x60e8,0x60e9,0x60eb,0x60ed,0x60ef,0x60f0,0x60f3,
  0x60f6,0x60f9,0x6101,0x6108,0x6109,0x610f,0x6115,0x611a,
  0x611f,0x6124,0x6127,0x613f,0x6148,0x614c,0x614e,0x6155,
  0x6162,0x6167,0x6168,0x6170,0x6177,0x618b,0x618e,0x6194,
  0x61a8,0x61be,0x61c2,0x61c8,0x61ca,0x61d2,0x61e6,0x6208,
  0x620f,0x6210,0x6211,0x6212,0x6216,0x6218,0x621a,0x622a,
  0x6233,0x6234,0x6237,0x623f,0x6240,0x6241,0x6247,0x624b,
  0x624d,0x624e,0x6251,0x6252,0x6253,0x6254,0x6258,0x625b,
  0x6263,0x6267,0x6269,0x626b,0x626c,0x626d,0x626e,0x626f,
  0x6270,0x6273,0x6276,0x6279,0x627c,0x627e,0x627f,0x6280,
  0x6284,0x628a,0x6291,0x6292,0x6293,0x6295,0x6296,0x6297,
  0x6298,0x629a,0x629b,0x62a0,0x62a1,0x62a2,0x62a4,0x62a5,
  0x62ab,0x62ac,0x62b1,0x62b5,0x62b9,0x62bc,0x62bd,0x62c2,
  0x62c4,0x62c5,0x62c6,0x62c7,0x62c9,0x62cc,0x62cd,0x62d0,
  0x62d2,0x62d3,0x62d4,0x62d6,0x62d7,0x62d8,0x62d9,0x62db,
  0x62dc,0x62df,0x62e2,0x62e3,0x62e5,0x62e6,0x62e7,0x62e8,
  0x62e9,0x62ec,0x62ed,0x62ef,0x62f1,0x62f3,0x62f4,0x62f7,
  0x62fc,0x62fe,0x62ff,0x6301,0x6302,0x6307,0x6309,0x630e,
  0x6311,0x6316,0x631a,0x631f,0x6320,0x6321,0x6323,0x6324,
]

function clamp(min: number, val: number, max:number) {
  return Math.min(max, Math.max(min, val));
}

export function LyricCharacter({ nowTime, beginTime, endTime, speed, children }: {
  nowTime: number,
  beginTime: number,
  endTime: number,
  speed?: number,
  children: string
}) {
  let time = nowTime - beginTime

  const [lastTimePeriod, setLastTimePeriod] = useState<number | undefined>(undefined)
  const [character, setCharacter] = useState('　')

  const randomList = useMemo(() => {
    if (randomPunctuation.includes(children)) return randomPunctuation;
    else return randomHiragana;
  }, [children]);

  useEffect(() => {
    if (nowTime < beginTime)  setCharacter('　');
    else if (nowTime < endTime) {
      const timePeriod = Math.floor(time / (speed ?? 20));
      if (lastTimePeriod !== timePeriod) {
        let unicode = children.charCodeAt(0);
        if (randomPunctuation.includes(children)) {
          setCharacter(randomPunctuation[Math.floor(Math.random() * randomPunctuation.length)]);
        } else if(unicode >= 0x61 && unicode <= 0x7A) {
          setCharacter(String.fromCharCode(Math.floor(Math.random() * 26) + 0x61));
        } else if(unicode >= 0x41 && unicode <= 0x5A) {
          setCharacter(String.fromCharCode(Math.floor(Math.random() * 26) + 0x41));
        } else if(unicode >= 0x4E00 && unicode <= 0x9FA5) {
          // setCharacter(String.fromCharCode(Math.floor(Math.random() * 20902) + 0x4E00));
          // setCharacter(String.fromCharCode(Math.floor(Math.random() * 0x2B) + 0x3105));
          setCharacter(String.fromCharCode(randomSimplify[Math.floor(Math.random() * randomSimplify.length)]));
        } else if (unicode >= 0x30A0 && unicode <= 0x30FF) {
          setCharacter(String.fromCharCode(Math.floor(Math.random() * 96) + 0x30A0));
        } else {
          setCharacter(String.fromCharCode(Math.floor(Math.random() * 96) + 0x3040));
        }
      }
      setLastTimePeriod(timePeriod);
    } else {
      setCharacter(children);
    }
  }, [lastTimePeriod, nowTime])

  const opacity = clamp(0, nowTime - beginTime, 100) / 100
  // const opacity = nowTime < beginTime ? 0 : nowTime < endTime ? 0.8 : 1
  return (
    <Wrapper style={{ opacity }}>
      { character }
    </Wrapper>
  )
}

// export const LyricCharacter: FC<PropsWithChildren> = ({ children }) => {
//   return (
//     <Wrapper>
      
//     </Wrapper>
//   )
// }