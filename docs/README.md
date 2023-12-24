项目问题记录

问题1：项目使用高德api无法加载地图

查询资料结果
mockjs会修改地图数据请求的头信息，他们正在优化，现在解决的方式就是不使用mockjs

问题二：
antv/l7中 使用tiff文件创建rasterLayer 地图产生变形

解决：栅格图像的坐标系应该更换为 WGS_1984_Web_Mercator_Auxiliary_Sphere
